const STRING = {
  ADMIN_PANEL: {
    title: "Admin Panel",
    textInputName: "Tender Name",
    textInputDescription: "Description",
    startingBid: 'Starting Bid',
    startTime: "Start Time",
    endTime: "End Time",
    bufferTime: "Buffer Time",
    submitButton: "Submit",
  },
  TENDER_CARD: {
    startTime: 'Start Time',
    endTime: 'End Time',
    startingBid:'Starting Bid',
    topBids:'Top Bids',
  },
  
  WEB_APP_NAME: "Tender Management System",
};
export { STRING };

const ROUTES = {
  HOME: "/",
  ADMIN: "/Admin",
  ADD_TENDER: "/Admin/add-tender",
  TENDER: "/tender/",
};

const ROUTES_CONFIG = {
  HOME: {
    path: ROUTES.HOME,
    title: "Home",
  },
  ADMIN: {
    path: ROUTES.ADMIN,
    title: "Admin",
  },
  ADD_TENDER: {
    path: ROUTES.ADD_TENDER,
    title: "Add Tender",
  },
  TENDER: {
    path: ROUTES.TENDER,
    title: "Tender",
  },
};
export { ROUTES, ROUTES_CONFIG };
// const TenderData = {
//   id:'bacdefe',
//   name: "canteen",
//   description: "tadwaw dawd awd ",
//   bufferTime: "202123",
//   startTime: "",
//   endTime: "",
// bids : [{id:'',bidCost:'', companyName:'',bidTime:''}]
// };
