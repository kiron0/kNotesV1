import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import LOGO from "../../../assets/notes.png";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";
import auth from "../../../auth/Firebase/firebase.init";
import { InitializeContext } from "../../../App";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";

const Dashboard: any = () => {
          const { appName } = useContext(InitializeContext);
          const [user, isLoading] = useAuthState(auth);
          const [userRole, adminLoading] = useUserRole(user);
          const navigate = useNavigate();

          const handleLogOut = () => {
                    Swal.fire({
                              title: "Are you sure?",
                              text: "You will be signed out from this account.",
                              icon: "warning",
                              showCancelButton: true,
                              background: "#333",
                              color: "#fff",
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, sign out!",
                    }).then((result: any) => {
                              if (result.isConfirmed) {
                                        signOut(auth).then(() => {
                                                  navigate("/")
                                                  localStorage.removeItem("accessToken");
                                                  localStorage.removeItem("uid");
                                                  toast.success(`Thank you, ${user?.displayName} to stay with us!`, {
                                                            position: "top-center",
                                                  });
                                        }).catch((err) => {
                                                  toast(err.message, {
                                                            icon: '👎',
                                                  })
                                        })
                              }
                    })
          };

          if (isLoading || adminLoading) {
                    return <Loading />;
          }

          return (
                    <div className="drawer lg:drawer-open">
                              <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                              <div className="drawer-content p-3 md:p-3">
                                        <div className="header glass z-50 sticky top-3 flex justify-between items-center shadow-lg p-4 rounded-xl">
                                                  <label
                                                            htmlFor="dashboard-sidebar"
                                                            className="btn btn-outline btn-primary border-primary drawer-button lg:hidden text-black"
                                                  >
                                                            <MdSpaceDashboard className="text-2xl text-black hover:text-white" />
                                                  </label>
                                                  <div className="flex items-center gap-1 text-black">
                                                            <h1 className="text-lg md:text-2xl font-semibold hidden md:flex">
                                                                      Welcome to
                                                            </h1>
                                                            <Link
                                                                      to="/"
                                                                      className="text-xl md:text-2xl font-semibold md:text-primary"
                                                            >
                                                                      {appName} <span className="text-xs md:hidden"> - Notepad Web App</span>
                                                            </Link>
                                                            <h1 className="text-lg md:text-2xl font-semibold hidden md:flex">
                                                                      ({userRole && userRole ? "Admin" : "User"} Panel)
                                                            </h1>
                                                  </div>
                                                  <div className="dropdown dropdown-end">
                                                            <label
                                                                      tabIndex={0}
                                                                      className="btn btn-ghost btn-circle avatar online"
                                                            >
                                                                      <div
                                                                                style={{ display: "grid" }}
                                                                                className="w-10 h-10  place-items-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                                                                      >
                                                                                <img
                                                                                          src={auth?.currentUser?.photoURL as string}
                                                                                          alt={auth?.currentUser?.displayName || ""}
                                                                                />
                                                                      </div>
                                                            </label>
                                                            <ul
                                                                      tabIndex={0}
                                                                      className="mt-6 -mr-4 p-2 shadow-xl menu menu-compact dropdown-content rounded-box w-72 glass bg-gradient-to-tr from-[#cf9aff] to-[#95c0ff]"
                                                            >
                                                                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                                <img
                                                                                          src={auth?.currentUser?.photoURL as string}
                                                                                          alt={auth?.currentUser?.displayName || ""}
                                                                                />
                                                                      </div>
                                                                      <div className="text-center mb-4 text-white">
                                                                                <span className="font-semibold">Hello,</span>
                                                                                <span className="flex justify-center items-center gap-1 font-semibold">
                                                                                          <h2 className="text-primary">
                                                                                                    {auth?.currentUser?.displayName}
                                                                                          </h2>
                                                                                          <i className='bx bxs-hand' ></i>
                                                                                </span>
                                                                                <div className="flex flex-col items-center gap-1 pt-2 md:hidden">
                                                                                          <h1 className="font-semibold">
                                                                                                    Welcome to,{" "}
                                                                                                    <span className="font-semibold text-primary">
                                                                                                              <Link to="/">{appName}</Link>
                                                                                                    </span>
                                                                                          </h1>
                                                                                          <h1 className="font-semibold">
                                                                                                    {userRole && userRole === "developer" ? "Developer" : userRole === "admin" ? "Admin" : "User"} Panel
                                                                                          </h1>
                                                                                </div>
                                                                      </div>
                                                                      <hr className="font-semibold" />
                                                                      <li className="py-1 text-red-600">
                                                                                <button onClick={handleLogOut}>
                                                                                          <i className="bx bx-log-out font-semibold"></i>
                                                                                          Sign Out
                                                                                </button>
                                                                      </li>
                                                            </ul>
                                                  </div>
                                        </div>
                                        <Outlet />
                              </div>
                              <div className="drawer-side shadow-xl z-50">
                                        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                                        <ul className="menu p-4 overflow-y-auto h-full w-80 bg-base-100 text-base-content glass bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff]">
                                                  <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b pb-5">
                                                            <Link
                                                                      to="/"
                                                                      className="logo font-semibold text-center flex items-center flex-col gap-2 text-white"
                                                            >
                                                                      <img src={LOGO} alt="" className="w-16" /> {appName}
                                                            </Link>
                                                  </div>
                                                  <li className="py-2 mt-4">
                                                            <NavLink
                                                                      className={({ isActive }) =>
                                                                                isActive ? "text-white bg-primary" : ""
                                                                      }
                                                                      to="/adminDash"
                                                            >
                                                                      <i className="bx bxs-dashboard text-xl"></i> Dashboard
                                                            </NavLink>
                                                  </li>
                                                  {userRole === "admin" && (
                                                            <>
                                                                      <li className="py-2">
                                                                                <NavLink
                                                                                          className={({ isActive }) =>
                                                                                                    isActive ? "text-white bg-primary" : "text-white"
                                                                                          }
                                                                                          to="/adminDash/allNotes"
                                                                                >
                                                                                          <i className="bx bx-note text-xl"></i> Manage All
                                                                                          Notes
                                                                                </NavLink>
                                                                      </li>
                                                                      <li className="py-1">
                                                                                <NavLink
                                                                                          className={({ isActive }) =>
                                                                                                    isActive ? "text-white bg-primary" : "text-white"
                                                                                          }
                                                                                          to="/adminDash/setting"
                                                                                >
                                                                                          <i className="bx bx-cog text-xl"></i> Setting
                                                                                </NavLink>
                                                                      </li>
                                                            </>
                                                  )}
                                                  <li className="absolute bottom-5 w-72">
                                                            <button
                                                                      onClick={handleLogOut}
                                                                      className="bg-transparent hover:bg-primary hover:border-primary border-2 border-white rounded-lg text-white hover:text-white duration-300"
                                                            >
                                                                      <i className="bx bx-log-out"></i> Sign Out
                                                            </button>
                                                  </li>
                                        </ul>
                              </div>
                    </div>
          );
};

export default Dashboard;
