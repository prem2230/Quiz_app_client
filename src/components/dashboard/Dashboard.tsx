import { Add, QuestionAnswer, Quiz } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./dashboard.styles";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const styles = useStyles();
    const navigate = useNavigate();

    const dashboardItems = [
        {
            title: "Create Question",
            icon: <Add />,
            link: "/dashboard/create-question"
        },
        {
            title: "Create Quiz",
            icon: <Add />,
            link: "/dashboard/create-quiz"
        },
        {
            title: "View Questions",
            icon: <QuestionAnswer />,
            link: "/dashboard/view-questions"
        },
        {
            title: "View Quizzes",
            icon: <Quiz />,
            link: "/dashboard/view-quizzes"
        }
    ]

    const handleNavigation = (path: string) => {
        navigate(path)
    }

    return (
        <React.Fragment>
            <Container sx={styles.container}>
                <Typography align="center" fontStyle={"italic"} variant="h4">Welcome to TechQuiz ...</Typography>
                <Grid container spacing={2}>
                    {dashboardItems.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} sx={styles.gridItem} key={index}>
                            <Box sx={styles.cardBox} onClick={() => handleNavigation(item.link)}>
                                {item.icon}
                                {item.title}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </React.Fragment >
    )
}

export default Dashboard;