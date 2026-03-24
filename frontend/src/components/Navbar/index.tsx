import { useState } from "react";
import {
  IconDashboard,
  IconScaleOutline,
  IconBarbell,
  IconCategory2,
  IconLogout,
} from "@tabler/icons-react";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import Logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import classes from "./style.module.css";

interface NavbarLinkProps {
  icon: typeof IconCategory2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        aria-label={label}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconDashboard, label: "Dashboard" },
  { icon: IconScaleOutline, label: "Weight" },
  { icon: IconCategory2, label: "Routines" },
  { icon: IconBarbell, label: "Exercises" },
];

export function Navbar() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <motion.nav
      className={classes.navbar}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Center>
        <img src={Logo} width={30} height={30} />
        <motion.div
          className="h-[80px] w-[200px] cursor-pointer rounded-[50px] bg-[#00ccff]"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center">{links}</Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </motion.nav>
  );
}
