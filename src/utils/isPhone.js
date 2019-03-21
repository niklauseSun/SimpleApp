
export default function isMobileNumber(phone) {
  var flag = false;
  var message = "";
  var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
  if (phone == '') {
    message = "手机号码不能为空！";
  } else if (phone.length != 11) {
    message = "请输入11位手机号码！";
  } else if (!myreg.test(phone)) {
    message = "请输入有效的手机号码！";
  } else {
    flag = true;
  }
  if (message != "") {
    // alert(message);
  }
  return flag;
}