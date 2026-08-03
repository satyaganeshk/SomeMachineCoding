
// HomePage.tsx
// NOTE: This is a starter template with a scalable structure.
// Add your project data to the `projects` array.

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  TextField,
  Table,
} from "@mui/material";

import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import BackupTableIcon from '@mui/icons-material/BackupTable';

const projects = [
  {
    title: "Todo App",
    description: "CRUD, Local Storage, Filtering",
    icon: <ChecklistRoundedIcon color="primary" />,
    difficulty: "Easy",
    path: "/todoList",
  },
  {
    title: "Chat App",
    description: "Realtime Messaging UI",
    icon: <ChatRoundedIcon color="secondary" />,
    difficulty: "Medium",
    path: "/chat-app",
  },
  {
    title: "Dashboard",
    description: "Data Visualization, Charts, Tables",
    icon: <BackupTableIcon color="success" />,
    difficulty: "Medium",
    path: "/dashboard",
  },
];

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0B1120",
        color: "white",
      }}
    >
      <AppBar
        elevation={0}
        sx={{
          bgcolor: "transparent",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <RocketLaunchRoundedIcon color="primary" />
          <Typography ml={1} fontWeight={700} flex={1}>
            Machine Coding Hub
          </Typography>

          <Button color="inherit">Projects</Button>
          <Button color="inherit">GitHub</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ pt: 14 }}>
        <Chip
          label="React • TypeScript • Material UI"
          color="primary"
        />

        <Typography
          variant="h2"
          fontWeight={800}
          mt={3}
        >
          Frontend Machine
          <br />
          Coding Playground
        </Typography>

        <Typography
          mt={2}
          color="grey.400"
          maxWidth={700}
        >
          A collection of frontend interview projects,
          reusable components and machine coding challenges.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          mt={4}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
          >
            Explore
          </Button>

          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </Stack>

        <TextField
          fullWidth
          placeholder="Search Projects..."
          sx={{
            mt: 6,
            bgcolor: "white",
            borderRadius: 2,
          }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          mt={3}
          flexWrap="wrap"
        >
          {["All","React","TypeScript","Easy","Medium","Hard"].map((c)=>(
            <Chip key={c} label={c}/>
          ))}
        </Stack>

        <Typography
          variant="h4"
          mt={6}
          mb={3}
          fontWeight={700}
        >
          Projects
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
          {projects.map((p)=>(
            <Grid item xs={12} md={6} lg={4} key={p.title}>
              <Card
                sx={{
                  bgcolor:"#111827",
                  color:"white",
                  border:"1px solid #1f2937",
                  transition:".3s",
                  "&:hover":{
                    transform:"translateY(-8px)",
                    borderColor:"#3b82f6",
                  }
                }}
              >
                <CardContent>
                  {p.icon}

                  <Typography
                    variant="h6"
                    mt={2}
                    fontWeight={700}
                  >
                    {p.title}
                  </Typography>

                  <Typography
                    color="grey.400"
                    mt={1}
                  >
                    {p.description}
                  </Typography>

                  <Chip
                    size="small"
                    label={p.difficulty}
                    sx={{ mt:2 }}
                  />

                  <Button
                    sx={{ mt:3 }}
                    endIcon={<ArrowForwardRoundedIcon />}
                    href={`${p.path}`}
                  >
                    Open Project
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

