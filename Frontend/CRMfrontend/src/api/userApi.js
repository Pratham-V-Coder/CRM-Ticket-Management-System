import axios from "axios";

const rootUrl = "http://localhost:4000/v1/";
const loginUrl = rootUrl + "user/login";
const registerUrl = rootUrl + "user";
const userProfileUrl = rootUrl + "user";
const logoutUrl = rootUrl + "user/logout";
const newAccessJWT = rootUrl + "tokens/new-access-jwt";
const adminLoginUrl = rootUrl + "admin/login";
const adminProfileUrl = rootUrl + "admin";
const adminLogoutUrl = rootUrl + "admin/logout";

export const userRegister = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(registerUrl, formData);
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userLogin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(loginUrl, formData);

      if (res.data.status === "success") {
        // ✅ Dono jagah save karo
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
        localStorage.setItem("accessJWT", res.data.accessJWT);

        localStorage.setItem(
          "crmSite",
          JSON.stringify({
            refreshJWT: res.data.refreshJWT,
          }),
        );
      }

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT =
        sessionStorage.getItem("accessJWT") ||
        localStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }

      const res = await axios.get(userProfileUrl, {
        headers: {
          Authorization: `Bearer ${accessJWT}`,
        },
      });

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchNewAccessJWT = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const crmSite = localStorage.getItem("crmSite");
      if (!crmSite) return reject("Token not found");

      const { refreshJWT } = JSON.parse(crmSite);
      if (!refreshJWT) return reject("Token not found");

      const res = await axios.get(newAccessJWT, {
        headers: {
          Authorization: `Bearer ${refreshJWT}`,
        },
      });

      if (res.data.status === "success") {
        // ✅ Dono jagah save karo
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
        localStorage.setItem("accessJWT", res.data.accessJWT);
      }

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userLogout = async () => {
  try {
    const token =
      sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT");
    if (token) {
      await axios.delete(logoutUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.log("Logout API error (ignored):", error.message);
  } finally {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    localStorage.removeItem("user");
  }
};

export const adminLogin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(adminLoginUrl, formData);

      if (res.data.status === "success") {
        // ✅ Dono jagah save karo
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
        localStorage.setItem("accessJWT", res.data.accessJWT);

        localStorage.setItem(
          "crmSite",
          JSON.stringify({
            refreshJWT: res.data.refreshJWT,
          }),
        );
      }

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT =
        sessionStorage.getItem("accessJWT") ||
        localStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }

      const res = await axios.get(adminProfileUrl, {
        headers: {
          Authorization: `Bearer ${accessJWT}`,
        },
      });

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const adminLogout = async () => {
  try {
    await axios.delete(adminLogoutUrl, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT")}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    // ✅ Sab clean karo
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    localStorage.removeItem("admin");
  }
};
