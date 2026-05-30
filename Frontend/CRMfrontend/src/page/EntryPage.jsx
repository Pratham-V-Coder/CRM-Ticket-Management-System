import React, { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";

function EntryPage() {
  const [frmLoad, setFrmLoad] = useState("login");

  return (
    <>
      {frmLoad === "login" && <Login setFrmLoad={setFrmLoad} />}

      {frmLoad === "register" && <Register setFrmLoad={setFrmLoad} />}

      {frmLoad === "reset" && (
        <ForgotPassword
          setFrmLoad={setFrmLoad} // ✅ sirf yeh chahiye, baki sab remove
        />
      )}
    </>
  );
}

export default EntryPage;
