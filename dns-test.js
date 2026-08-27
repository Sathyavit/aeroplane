import dns from "dns";

dns.resolveSrv(
  "_mongodb._tcp.skywingscluster.geospr9.mongodb.net",
  (err, records) => {
    console.log("Error:", err);
    console.log("Records:", records);
  }
);