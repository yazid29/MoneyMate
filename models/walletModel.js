const pool = require("../connection/db");
const { logger } = require("../middleware/logger");

class walletModel {
    getAllData = async () => {
        try {
            const wallets = await pool('tb_wallets').select(
                'name_wallet','balance','type'
            );
            return wallets;
        } catch (error) {
            console.log(error);
        }
    }
    getDatabyUsername = async (id_user,name_wallet = "all") => {
        try {
            let query = pool('tb_wallets').select('name_wallet', 'balance', 'type');
            query = query.where({ user_id: id_user });

            if (name_wallet !== "all") {
                query = query.where({ name_wallet: name_wallet });
            }

            const wallets = await query;

            return wallets;
        } catch (error) {
            console.log(error);
        }
    }
    
    insertData = async (data) => {
        try {
            const wallets = await pool('tb_wallets').insert({
                user_id:data.user_id,
                name_wallet:data.name,
                balance:data.balance,
                type:data.type
            });
            console.log('Wallet created successfully');
            return wallets;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new walletModel();