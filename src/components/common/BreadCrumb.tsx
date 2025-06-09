import { Box, Breadcrumbs, Link, Typography, useTheme } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

interface BreadcrumbItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    currentPageTitle?: string;
}

const Breadcrumb = ({ items = [], currentPageTitle }: BreadcrumbProps) => {
    const location = useLocation();
    const theme = useTheme();

    const generateBreadcrumbItems = (path: string): BreadcrumbItem[] => {
        const pathSegments = path.split('/').filter(segment => segment);
        const breadcrumbItems: BreadcrumbItem[] = [];

        if (pathSegments[0] === 'dashboard') {
            pathSegments.shift();
        }

        let currentPath = '/dashboard';

        pathSegments.forEach((segment, index) => {
            if (index === pathSegments.length - 1) return;

            currentPath += `/${segment}`;

            const label = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            breadcrumbItems.push({
                label,
                path: currentPath
            });
        });

        return breadcrumbItems;
    };

    const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbItems(location.pathname);

    return (
        <Box >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />}
                aria-label="breadcrumb"
            >
                <Link
                    component={RouterLink}
                    to="/dashboard"
                    color="primary"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Dashboard
                </Link>

                {breadcrumbItems.map((item, index) => (
                    <Link
                        key={index}
                        component={RouterLink}
                        to={item.path}
                        color="inherit"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        {item.icon && <Box sx={{ mr: 0.5 }}>{item.icon}</Box>}
                        {item.label}
                    </Link>
                ))}

                {currentPageTitle && (
                    <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                        {currentPageTitle}
                    </Typography>
                )}
            </Breadcrumbs>
        </Box >
    );
};

export default Breadcrumb;
