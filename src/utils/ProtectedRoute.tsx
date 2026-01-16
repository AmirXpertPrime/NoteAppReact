import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { meApi } from "../services/apiList";
import { setAuthenticated, setAuthChecked, setUser } from "../redux/Slice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  let location = useLocation();
  const [isChecking, setIsChecking] = useState(false);

  console.log("ProtectedRoute Check:", {
    isAuthenticated: user?.isAuthenticated,
    userState: user,
  });

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      if (user?.isAuthenticated) return;
      if (user?.authChecked) return;

      setIsChecking(true);
      try {
        const res = await meApi();
        if (!cancelled && res?.success) {
          const name =
            res?.data?.fullName ||
            res?.data?.name ||
            res?.data?.user?.fullName ||
            res?.data?.user?.name ||
            res?.data?.user?.email ||
            "";
          dispatch(setAuthenticated(true));
          dispatch(setUser(name));
        }
      } finally {
        if (!cancelled) {
          dispatch(setAuthChecked(true));
          setIsChecking(false);
        }
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, [dispatch, user?.authChecked, user?.isAuthenticated]);

  // While we haven't checked the cookie with the server yet, show a tiny loading state
  if (!user?.isAuthenticated && !user?.authChecked) {
    return (
      <div style={{ padding: 16, fontFamily: "sans-serif" }}>
        {isChecking ? "Checking session..." : "Loading..."}
      </div>
    );
  }

  // Cookie auth: if server check says you're not logged in, redirect
  if (!user?.isAuthenticated) {
    console.log("ProtectedRoute: Redirecting to login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  console.log("ProtectedRoute: Access granted");
  return children;
};

export default ProtectedRoute;
