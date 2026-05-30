import axios from "axios";

const rootUrl = "http://localhost:4000/v1/";

const adminLoginUrl = rootUrl + "admin/login";
const adminProfileUrl = rootUrl + "admin";
const adminLogoutUrl = rootUrl + "admin/logout";

export const adminLogin = async (formData) => {
  try {
    const res = await axios.post(adminLoginUrl, formData);

    if (res.data.status === "success") {
      sessionStorage.setItem("accessJWT", res.data.accessJWT);

      localStorage.setItem("accessJWT", res.data.accessJWT);

      localStorage.setItem(
        "crmSite",
        JSON.stringify({
          refreshJWT: res.data.refreshJWT,
        }),
      );
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAdmin = async () => {
  try {
    const accessJWT =
      sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT");

    const res = await axios.get(adminProfileUrl, {
      headers: {
        Authorization: `Bearer ${accessJWT}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    const accessJWT =
      sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT");

    await axios.delete(adminLogoutUrl, {
      headers: {
        Authorization: `Bearer ${accessJWT}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    localStorage.removeItem("admin");
  }
};
