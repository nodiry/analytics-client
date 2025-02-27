export const set_cookie = (name:string, value:string, days:number=7):void=>{
    const found = get_cookie(name);
    if (found) del_cookie(name);
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;SameSite=Strict`;
};

export const get_cookie = (name: string): string | undefined => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split('%');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return undefined; // Return undefined if cookie is not found
  };

export const del_cookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;secure;SameSite=Strict`;
  };  