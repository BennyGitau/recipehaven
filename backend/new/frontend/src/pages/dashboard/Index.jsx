import { useNavigate } from "react-router-dom";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { useUser } from "@clerk/clerk-react";
import AdminHeader from "../../components/Dashboard/AdminHeader";

function DashboardPage() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!user) {
    navigate("/auth/login");
  }
  return (
    <>
      <AdminHeader />
    </>
  );
}

export default DashboardPage;
