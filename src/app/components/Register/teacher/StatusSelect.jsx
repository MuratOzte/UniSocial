import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import registerSlice from "@/store/Slices/RegisterSlice";

export default function BasicSelect() {
  const dispatch = useDispatch();
  const register=useSelector((state)=>state.register)
  const handleChange = (event) => {
    dispatch(registerSlice.actions.statusChangeHandler(event.target.value));
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
          <InputLabel id="demo-simple-select-label">status</InputLabel>
          <Select
           disabled={!register.departmentValue}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={register.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={'Profesör'}>Profesör</MenuItem>
            <MenuItem value={'Doçent'}>Doçent</MenuItem>
            <MenuItem value={'Doktor Öğretim Üyesi'}>Doktor Öğretim Üyesi</MenuItem>
            <MenuItem value={'Öğretim Görevlisi'}>Öğretim Görevlisi</MenuItem>
            <MenuItem value={'Araştırma Görevlisi'}>Araştırma Görevlisi</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </motion.div>
  );
}
