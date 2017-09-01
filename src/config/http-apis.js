/* ==========================
微信验证
============================*/
// 微信端授权（基础）
export const WEIXIN_BASE = '/weixin/authorize/base';
// 微信端Token授权（基础）
export const WEIXIN_TOKEN = '/weixin/accessToken/base';
// 微信端Token授权（用户资料）
export const WEIXIN_USERINFO = '/weixin/accessToken/userinfo';
// 微信端更新Token授权
export const WEIXIN_TOKEN_UPDATE = '/oauth/client/accessToken';

/* ==========================
用户资料
============================*/
export const USER_INFO = '/get/info';

/* ==========================
客户API
============================*/
// 客户列表
export const CUSTOMER_LIST = '/bs/customer/find';
// 客户详情
export const CUSTOMER_DETAIL = '/bs/customer/detail';
// 删除客户
export const CUSTOMER_REMOVE = '/bs/customer/remove';
// 编辑客户
export const CUSTOMER_UPDATE = '/bs/customer/update';
// 创建客户
export const CUSTOMER_CREATE = '/bs/customer/create';
// 客户文件
export const CUSTOMER_FILE = '/bs/customer/file';
// 删除客户文件
export const CUSTOMER_FILE_REMOVE = '/bs/customer/file/remove';
// 创建客户文件
export const CUSTOMER_FILE_CREATE = '/bs/customer/file/create';
// 修改客户文件
export const CUSTOMER_FILE_UPDATE = '/bs/customer/file/update';

// 修改客户文件
export const CUSTOMER_TRANSFER = '/bs/customer/transfer/detail';
export const CUSTOMER_TRANSFER_UPDATE = '/bs/customer/transfer/update';
/* ==========================
客户需求API
============================*/
// 创建客户需求
export const REQUIRE_CREATE = '/bs/service/require/create';
// 客户需求列表
export const REQUIRE_FIND = '/bs/service/require/find';
// 客户需求详情
export const REQUIRE_DETAIL = '/bs/service/require/detail';
// 修改客户需求
export const REQUIRE_UPDATE = '/bs/service/require/update';
// 删除客户需求
export const REQUIRE_REMOVE = '/bs/service/require/remove';