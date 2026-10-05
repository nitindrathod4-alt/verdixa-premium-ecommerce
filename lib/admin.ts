export function isAdminRequest(request:Request){
 const expected=process.env.ADMIN_DASHBOARD_TOKEN;
 if(!expected)return false;
 return request.headers.get("authorization")===`Bearer ${expected}`;
}