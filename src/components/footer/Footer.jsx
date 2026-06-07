// const Footer = () => {
//   return (
//     <footer className="bg-slate-900 text-white border-t border-slate-700 shadow-lg">
//       <div className="max-w-7xl mx-auto px-6 py-6">

//         {/* Header */}
//         <div className="text-center mb-5">
//           <h3 className="text-2xl font-bold tracking-wide">
//             🏥 Hospital Management System
//           </h3>

//           <p className="text-slate-400 text-sm mt-2">
//             Complete Solution for Hospital Administration & Patient Care
//           </p>
//         </div>

//         {/* Modules */}
//         <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-300 mb-5">
//           <span>Patients</span>
//           <span>•</span>

//           <span>Doctors</span>
//           <span>•</span>

//           <span>Appointments</span>
//           <span>•</span>

//           <span>Admissions</span>
//           <span>•</span>

//           <span>Departments</span>
//           <span>•</span>

//           <span>Rooms</span>
//           <span>•</span>

//           <span>Beds</span>
//           <span>•</span>

//           <span>Emergency Requests</span>
//         </div>

//         {/* Statistics */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-y border-slate-700 py-4 mb-4">

//           <div>
//             <h4 className="text-lg font-bold text-cyan-400">24/7</h4>
//             <p className="text-xs text-slate-400">Hospital Support</p>
//           </div>

//           <div>
//             <h4 className="text-lg font-bold text-green-400">Secure</h4>
//             <p className="text-xs text-slate-400">Data Management</p>
//           </div>

//           <div>
//             <h4 className="text-lg font-bold text-yellow-400">Real-Time</h4>
//             <p className="text-xs text-slate-400">Monitoring</p>
//           </div>

//           <div>
//             <h4 className="text-lg font-bold text-red-400">Emergency</h4>
//             <p className="text-xs text-slate-400">Response System</p>
//           </div>

//         </div>

//         {/* Bottom */}
//         <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">

//           <p>
//             © 2026 Hospital Management System. All Rights Reserved.
//           </p>

//           <p className="mt-2 md:mt-0">
//             Developed By <span className="font-semibold text-white">Tarun Goswami</span>
//           </p>

//           <p className="mt-2 md:mt-0">
//             Version 1.0.0
//           </p>

//         </div>

//       </div>
//     </footer>
//   );
// };

//export default Footer;


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-t border-slate-800">

      <div className="px-8 py-8">

       <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10">

          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold mb-2 whitespace-nowrap">
  🏥 Hospital Management System
        </h3>

           <p className="text-slate-400 text-sm leading-7 mt-3">
  Streamlining hospital operations through
  patient management, doctor scheduling,
  admissions, appointments, departments,
  emergency services and healthcare workflows.
</p>
          </div>

          {/* Center */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-cyan-400">
              Core Modules
            </h4>

            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">

              <span>Patients</span>
              <span>Doctors</span>

              <span>Appointments</span>
              <span>Admissions</span>

              <span>Departments</span>
              <span>Rooms</span>

              <span>Beds</span>
              <span>Emergency</span>

            </div>
          </div>

          {/* Right */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-cyan-400">
              System Information
            </h4>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Status
                </span>

                <span className="text-green-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Online
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Version
                </span>

                <span>1.0.0</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Environment
                </span>

                <span>Production</span>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-5">

          <div className="flex flex-col md:flex-row justify-between items-center">

            <p className="text-slate-500 text-sm">
              © 2026 Hospital Management System.
              All Rights Reserved.
            </p>

            <p className="text-sm mt-2 md:mt-0">
              Developed by
              <span className="text-cyan-400 font-semibold ml-1">
                Tarun Goswami
              </span>
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;