/**
 * Created by shenlin on 07/11/2017.
 */
const mailjet = require ('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

module.exports = mailjet;