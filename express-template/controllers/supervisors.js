import axios from "axios";

export const getSupervisor = async (req, res) => {
  try {
    const response = await axios.get(
      "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers"
    );

    const supervisorsObj = response.data.map((value) => ({
      jurisdiction: value.jurisdiction,
      lastName: value.lastName,
      firstName: value.firstName,
    }));

    //console.log(newArray);
    supervisorsObj.sort((a, b) => {
      a.jurisdiction.toLowerCase().localeCompare(b.jurisdiction.toLowerCase());
    });
    supervisorsObj.sort((a, b) =>
      a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
    );
    supervisorsObj.sort((a, b) =>
      a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
    );

    const newArray = supervisorsObj.filter(
      (s) => !/^\d+$/.test(s.jurisdiction)
    );
    // filtered = supervisorsObj.jurisdiction.filter(
    //   (s) => !/^\d+$/.test(s.jurisdiction)
    // );

    console.log(newArray);
    res.json({ supervisors: newArray });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const createSupervisor = async (req, res) => {
  let hasNumber = /\d/;
  let phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

  try {
    if (
      req.body.firstName === "" ||
      req.body.lastName === "" ||
      req.body.supervisor === ""
    ) {
      console.log("error: missing fields");
      res.status(400).json({ message: "missing fields" });
      return;
    }

    if (hasNumber.test(req.body.firstName)) {
      console.log("error: Number in firstname");
      res.status(400).json({ message: "Number in firstname" });
      return;
    }

    if (!phoneno.test(req.body.phoneNumber)) {
      console.log("Error: phone number");
      res.json({ message: "phone number" });
      return;
    }
    console.log(req.body);
    res.status(200).json({ message: "registeration successful", result });
    res.json({ supervisors: req.body });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
};
