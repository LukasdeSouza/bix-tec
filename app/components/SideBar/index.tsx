"use client";
import {
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { BiChart, BiHome, BiLogOut, BiMenu } from "react-icons/bi";

const drawerWidth = 280;

interface Props {
  window?: () => Window;
  loading: boolean;
  children: React.ReactNode;
}

const SideBar = (props: Props) => {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{ backgroundColor: "#fff" }}>
      <Toolbar style={{ backgroundColor: "#fff" }} />
      <Divider />
      <List>
        <ListItem key={"Home"} onClick={() => {}} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BiHome size={23} color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={"Home"}
              primaryTypographyProps={{
                color: "primary",
                fontFamily: "Poppins",
                fontSize: 16,
                fontWeight: 600,
              }}
              secondary="retorne ao login"
              secondaryTypographyProps={{
                color: "textSecondary",
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 12,
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Dashboard"} disablePadding>
          <ListItemButton onClick={() => router.push("/dashboard/home")}>
            <ListItemIcon>
              <BiChart size={23} />
            </ListItemIcon>
            <ListItemText
              primary={"Dashboard"}
              primaryTypographyProps={{
                color: "primary",
                fontFamily: "Poppins",
                fontSize: 16,
                fontWeight: 600,
              }}
              secondary="veja suas informações financeiras"
              secondaryTypographyProps={{
                color: "textSecondary",
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 12,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"Sair"} disablePadding>
          <ListItemButton
            onClick={() => {
              localStorage.removeItem("auth_token_bix")
              router.push("/")
            }}
          >
            <ListItemIcon>
              <BiLogOut size={23} style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Sair"}
              primaryTypographyProps={{
                color: "#ff1c1c",
                fontFamily: "Poppins",
                fontSize: 16,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <BiMenu />
          </IconButton>
          <Typography
            color="primary"
            variant="h6"
            noWrap
            component="div"
            fontFamily={"Poppins"}
            fontWeight={600}
          >
            Bix Tecnologia - Dashboard Financeiro
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          backgroundColor: "#fff",
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none", backgroundColor: "#fff" },
            "& .MuiDrawer-paper": {
              backgroundColor: "red",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.loading ? <CircularProgress /> : <>{props.children}</>}
      </Box>
    </Box>
  );
};

export default SideBar;
