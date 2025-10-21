export const hostelIntro = "<p><b>Government Polytechnic Ghaziabad </b> is  one of the top polytechnic college in Uttar Pradesh. It is affliated from Board of Technical Education (BTE),Lucknow.It has two  separate hostel for girls ad boys. Both hostel are in college campus with affordable fees. <br /> The hostel are managed by the separate commitee of hostel which includes teacher , warden and principal.Hostel are made for students to make their works feasible.You will be provided with facilities like internet, music room, and common room with TV & cable facility, salon facilities, room for indoor games and a reading room with a collection of national/international newspapers, magazines, etc. The hostels houses have a fully equipped gym and separate courts for Volleyball, BasketBall, and Badminton. <br /> </p>"

export const hostelIntro1 = "<p>The admissions are made as per the rules approved by the Managing Committee of Mansarowar Hostel. The admission form duly filled in and certified by the Head of the concerned department along with the required documents, should reach the hostel office on or before the date for the receipt of application as mentioned in the hostel bulletin or displayed on the hostel notice board.</p>"

export const hostelFeesdetail = "<p>There are two separate hostel for boys and girls. We follow bteup guidesline to allot hostel. Hostel fees varies on gender and catergory.This fees will be same for all year students . There is 5% increment on fees every year.We take room fees , mess fees and security charges .You have to pay Room fees only once at the time of hostel allotment. Mess fees is taken every month.</p> "




// src/config/navLinks.js
const navLinks = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Room Details", path: "/admin/room_detail" },
    { label: "Student Applications", path: "/admin/student_application" },
    { label: "Complaints", path: "/admin/complaints" },
    { label: "Management Team", path: "/admin/management_team" },
    { label: "Logout", path: "/logout" },
  ],
  guest: [
    { label: "Home", path: "/" },
    { label: "Administration", path: "/administration" },
    { label: "Contact", path: "/contact" },
    {
      label: "Register",
      dropdown: [
        { label: "Admin", path: "/register/admin" },
        { label: "Management", path: "/register/management" },
        { label: "Student", path: "/register/student" },
      ],
    },
    {
      label: "Login",
      dropdown: [
        { label: "Admin", path: "/login/admin" },
        { label: "Management", path: "/login/management" },
        { label: "Student", path: "/login/student" },
      ],
    },
  ],
  student: [
    { label: "Application Status", path: "/student/application_status" },
    { label: "Personal Details", path: "/student/details" },
    { label: "Submit Complaint", path: "/student/complaint" },
    { label: "Room Details", path: "/student/room_details" },
    { label: "Logout", path: "/logout" },
  ],
  management: [
    { label: "Dashboard", path: "/management/dashboard" },
    { label: "View Rooms", path: "/management/room" },
    { label: "Student Details", path: "/management/student_detail" },
    { label: "Complaints", path: "/management/complaints" },
    { label: "Logout", path: "/logout" },
  ],
};

export default navLinks;