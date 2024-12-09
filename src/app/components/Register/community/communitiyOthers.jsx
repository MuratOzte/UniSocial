import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import registerSlice from "@/store/Slices/RegisterSlice";

export default function CommunityOthers() {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);
  const handleChange = (event) => {
    dispatch(
      registerSlice.actions.communityTypeChangeHandler(event.target.value)
    );
  };
  console.log(register);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Box sx={{ minWidth: 120, marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={register.communityType}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={"Şirket"}>aaaa</MenuItem>
            <MenuItem value={"Kulüp"}>Kulüp</MenuItem>
            <MenuItem value={"Etkinlik Grubu"}>Etkinlik Grubu</MenuItem>
            <MenuItem value={"Akademik Topluluk"}>Akademik Topluluk</MenuItem>
            <MenuItem value={"Hobi Topluluğu"}>Hobi Topluluğu</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </motion.div>
  );
}
