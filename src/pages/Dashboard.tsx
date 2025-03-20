import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Chip,
  Button,
  InputBase,
  Badge,
  Divider,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemButton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  BarChart as BarChartIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  MenuBook as BookIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Sample data for visualization (from original component)
const cohortData = [
  { id: 'cohort1', name: 'Spring 2025', startups: 45, avgScore: 4.3, activeStartups: 42 },
  { id: 'cohort2', name: 'Fall 2024', startups: 50, avgScore: 4.1, activeStartups: 46 },
  { id: 'cohort3', name: 'Spring 2024', startups: 48, avgScore: 3.9, activeStartups: 43 },
];

const startupMetrics = [
  { metric: 'Avg. VRP Score', value: 4.2, change: 0.3, trend: 'up' },
  { metric: 'Completion Rate', value: '87%', change: 5, trend: 'up' },
  { metric: 'Mentor Sessions', value: 183, change: -12, trend: 'down' },
  { metric: 'Resources Accessed', value: 1249, change: 127, trend: 'up' },
];

const topStartups = [
  { id: 1, name: 'TechnoVision Ltd', score: 4.8, industry: 'Tech', phase: 'IncuHatch' },
  { id: 2, name: 'GreenGrow Innovations', score: 4.7, industry: 'AgriTech', phase: 'IncuBoost' },
  { id: 3, name: 'MediHealth Solutions', score: 4.6, industry: 'HealthTech', phase: 'IncuBoost' },
  { id: 4, name: 'FinSecure Systems', score: 4.5, industry: 'FinTech', phase: 'Ideation' },
  { id: 5, name: 'CleanWave Energy', score: 4.4, industry: 'CleanTech', phase: 'IncuBoost' },
];

const upcomingScreenings = [
  {
    id: 1,
    name: 'Spring 2025 Ideation Selection',
    date: 'Apr 15, 2025',
    type: 'Pre-star candidate screening',
    applications: 78,
    status: 'Upcoming',
  },
  {
    id: 2,
    name: 'Fall 2024 IncuBoost Admission',
    date: 'Mar 30, 2025',
    type: 'IncuBoost admission',
    applications: 22,
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Spring 2024 Final Review',
    date: 'Mar 25, 2025',
    type: 'Program completion review',
    applications: 43,
    status: 'Preparation',
  },
];

const actionItems = [
  { id: 1, text: 'Review 8 pending startup assessments', priority: 'high', deadline: 'Mar 22, 2025' },
  { id: 2, text: 'Prepare shortlist for IncuBoost admission', priority: 'high', deadline: 'Mar 23, 2025' },
  { id: 3, text: 'Assign mentors to new Ideation cohort', priority: 'medium', deadline: 'Apr 1, 2025' },
  { id: 4, text: 'Update scoring criteria for HealthTech', priority: 'medium', deadline: 'Apr 5, 2025' },
  { id: 5, text: 'Review resource utilization reports', priority: 'low', deadline: 'Apr 10, 2025' },
];

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleStartupClick = (startupId: number) => {
    navigate(`/incubator-setup/${startupId}`);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ flexGrow: 1, pt: 8 }}>
        <ListItemButton selected>
          <ListItemIcon>
            <BarChartIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary='Startups' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Mentors' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary='Screening Events' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary='Resources' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItemButton>
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button startIcon={<LogoutIcon />} onClick={handleSignOut} color='inherit' fullWidth sx={{ justifyContent: 'flex-start' }}>
          Sign Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 'bold' }}>范略</Avatar>
            <Box>
              <Typography variant='h6' component='div'>
                VentureTrack
              </Typography>
              <Typography variant='caption' component='div' sx={{ color: 'white' }}>
                Track • Screen • Report
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isSmUp && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder='Search startups, programs...' inputProps={{ 'aria-label': 'search' }} />
            </Search>
          )}

          <IconButton color='inherit'>
            <Badge badgeContent={3} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar sx={{ ml: 2, bgcolor: 'primary.dark' }}>PM</Avatar>
        </Toolbar>
      </AppBar>

      <Box component='nav' sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          bgcolor: 'background.default',
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant='h5' component='h2' sx={{ fontWeight: 'bold' }}>
              Program Overview
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Monitor and track progress across all programs
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box component='select' sx={{ p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <option>All Programs</option>
              <option>Ideation Program</option>
              <option>IncuHatch</option>
              <option>IncuBoost</option>
            </Box>
            <IconButton sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <FilterListIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            {startupMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant='body2' color='textSecondary'>
                      {metric.metric}
                    </Typography>
                    {metric.trend === 'up' ? (
                      <ArrowUpwardIcon fontSize='small' color='success' />
                    ) : (
                      <ArrowDownwardIcon fontSize='small' color='error' />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant='h5' component='div' sx={{ fontWeight: 'bold' }}>
                      {metric.value}
                    </Typography>
                    <Typography variant='body2' color={metric.trend === 'up' ? 'success.main' : 'error.main'}>
                      {metric.trend === 'up' ? '+' : ''}
                      {metric.change}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Grid container spacing={3}>
          {/* Active Cohorts */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title='Active Cohorts'
                action={
                  <Button color='inherit' size='small' sx={{ color: 'white' }}>
                    View All
                  </Button>
                }
                sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Cohort</TableCell>
                        <TableCell>Startups</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Avg. Score</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cohortData.map(cohort => (
                        <TableRow key={cohort.id} hover>
                          <TableCell component='th' scope='row'>
                            {cohort.name}
                          </TableCell>
                          <TableCell>{cohort.startups}</TableCell>
                          <TableCell>{cohort.activeStartups}</TableCell>
                          <TableCell>{cohort.avgScore}</TableCell>
                          <TableCell>
                            <Chip size='small' label='In Progress' color='success' variant='outlined' />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Startups */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title='Top Performing Startups'
                action={
                  <Button color='inherit' size='small' sx={{ color: 'white' }}>
                    View All
                  </Button>
                }
                sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {topStartups.map((startup, index) => (
                    <Box
                      key={startup.id}
                      sx={{
                        p: 1.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)', // Lighter gray background on hover
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow on hover
                          transition: 'all 0.2s ease-in-out', // Smooth transition
                        },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleStartupClick(startup.id)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'white', width: 32, height: 32, fontSize: '0.875rem' }}>
                          {index + 1}
                        </Avatar>
                        <Box>
                          <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                            {startup.name}
                          </Typography>
                          <Typography variant='body2' color='textSecondary'>
                            {startup.industry} • {startup.phase}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip size='small' label={`Score: ${startup.score}`} color='primary' />
                        <ChevronRightIcon sx={{ color: 'text.disabled', ml: 1 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Screenings */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title='Upcoming Screening Events'
                action={
                  <Button color='inherit' size='small' sx={{ color: 'white' }}>
                    Schedule Event
                  </Button>
                }
                sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {upcomingScreenings.map(event => (
                    <Paper key={event.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                          {event.name}
                        </Typography>
                        <Chip
                          size='small'
                          label={event.status}
                          color={event.status === 'In Progress' ? 'primary' : event.status === 'Upcoming' ? 'warning' : 'default'}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <CalendarIcon fontSize='small' color='action' />
                        <Typography variant='body2' color='textSecondary'>
                          {event.date}
                        </Typography>
                        <Box component='span' sx={{ mx: 1 }}>
                          •
                        </Box>
                        <Typography variant='body2' color='textSecondary'>
                          {event.type}
                        </Typography>
                      </Box>
                      <Typography variant='body2'>
                        <Box component='span' sx={{ fontWeight: 'medium' }}>
                          {event.applications}
                        </Box>{' '}
                        applications
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Items */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title='Action Items'
                action={
                  <Button color='inherit' size='small' sx={{ color: 'white' }}>
                    View All Tasks
                  </Button>
                }
                sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {actionItems.map(item => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        p: 1.5,
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      {item.priority === 'high' ? (
                        <WarningIcon fontSize='small' color='error' />
                      ) : item.priority === 'medium' ? (
                        <ScheduleIcon fontSize='small' color='warning' />
                      ) : (
                        <CheckCircleIcon fontSize='small' color='success' />
                      )}
                      <Box>
                        <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
                          {item.text}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          Due: {item.deadline}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Button fullWidth variant='outlined' color='primary' sx={{ mt: 1 }}>
                    Add Task
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
