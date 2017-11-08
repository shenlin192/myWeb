/**
 * Created by shenlin on 07/11/2017.
 */
module.exports = function(userName, email, token){
    let div1 = `<div style="margin:0px auto;max-width:600px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;padding-bottom:0px;padding-top:0px;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;width:600px;">
      <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;background:#ffffff;font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;" align="center" background="#ffffff"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:220px;"><img alt="" title="" height="auto" src="http://n5ui.mjt.lu/img/n5ui/b/581/0yl2.jpeg" style="border:none;border-radius:;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="220"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div>`;

    let div2 = `<div style="margin:0px auto;max-width:600px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;width:600px;">
      <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;" align="left"><div style="cursor:auto;color:#55575d;font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;"><h1 style="font-size: 20px; font-weight: bold; text-align: center;">Welcome&nbsp;${userName}</h1></div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;" align="left"><div style="cursor:auto;color:#55575d;font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;"><p style="font-size: 13px; text-align: center; margin: 10px 0;"><span style="color:#8c8c8c; font-family:Roboto,Helvetica,Arial,sans-serif; font-size:14px">Just need to validate your email address to activate your shenlinweb account. Simply click the following button:</span></p></div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:10px 25px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0"><tbody><tr><td style="border:none;border-radius:3px;color:#ffffff;cursor:auto;padding:10px 25px;" align="center" valign="middle" bgcolor="#0283ff"><a href="http://www.shenlinweb.com/account/confirmation/${email}/${token}" style="text-decoration:none;background:#0283ff;color:#ffffff;font-family:Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;" target="_blank">Active my account</a></td></tr></tbody></table></td></tr>
    </tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div>`;
    return div1+div2
}