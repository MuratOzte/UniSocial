import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { motion } from "framer-motion";

export default function BasicSelect() {
  const [statu, setStatu] = React.useState("");

  const handleChange = (event) => {
    setStatu(event.target.value);
  };

  return (
    <motion.div
    initial={{x:-20,opacity:0}}
    animate={{x:0,opacity:1}}
    transition={{duration:0.5,delay:0.6}}
    >
      <Box sx={{ minWidth: 120, marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statu}
            label="statu"
            onChange={handleChange}
          >
            <MenuItem value={10}>Profesör</MenuItem>
            <MenuItem value={20}>Doçent</MenuItem>
            <MenuItem value={30}>Doktor Öğretim Üyesi</MenuItem>
            <MenuItem>Öğretim Görevlisi</MenuItem>
            <MenuItem>Araştırma Görevlisi</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </motion.div>
  );
}
