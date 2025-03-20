// src/pages/IncubatorSetup.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Container,
  Avatar,
  Tabs,
  Tab,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Divider,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Badge,
  Chip,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Backdrop,
  CircularProgress,
  Alert,
  styled,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  MenuBook as BookIcon,
  Timeline as TimelineIcon,
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import ApiService from '../services/api';
import { Company } from '../types/company';
import { Program, Resource, ScoringCriteria } from '../types/program';

// Styled components
const ChineseCharacter = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  fontWeight: 'bold',
  width: 48,
  height: 48,
  fontSize: '1.25rem',
}));

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  width: '100%',
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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

// Interface for tab panel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} id={`incubator-tabpanel-${index}`} aria-labelledby={`incubator-tab-${index}`} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Helper function for a11y
function a11yProps(index: number) {
  return {
    id: `incubator-tab-${index}`,
    'aria-controls': `incubator-tabpanel-${index}`,
  };
}

// Sample companies data
const companies: Company[] = [
  { id: 1, name: 'TechnoVision Ltd', industry: 'Tech', phase: 'Ideation', status: 'Active' },
  { id: 2, name: 'GreenGrow Innovations', industry: 'AgriTech', phase: 'IncuHatch', status: 'Active' },
  { id: 3, name: 'MediHealth Solutions', industry: 'HealthTech', phase: 'IncuBoost', status: 'Active' },
  { id: 4, name: 'EduSmart Technologies', industry: 'EdTech', phase: 'Ideation', status: 'Pending' },
  { id: 5, name: 'FinSecure Systems', industry: 'FinTech', phase: 'Ideation', status: 'Active' },
  { id: 6, name: 'LogiTech Transport', industry: 'Logistics', phase: 'IncuHatch', status: 'Inactive' },
  { id: 7, name: 'CleanWave Energy', industry: 'CleanTech', phase: 'IncuBoost', status: 'Active' },
  { id: 8, name: 'RetailPlus Solutions', industry: 'RetailTech', phase: 'Ideation', status: 'Active' },
  { id: 9, name: 'FoodTech Innovations', industry: 'FoodTech', phase: 'IncuHatch', status: 'Active' },
  { id: 10, name: 'SmartHome Systems', industry: 'IoT', phase: 'Ideation', status: 'Pending' },
];

// Program configuration data
const programTypes = [
  { id: 'ideation', name: 'Ideation Program', duration: '3 months' },
  { id: 'incuhatch', name: 'IncuHatch', duration: '12 months' },
  { id: 'incuboost', name: 'IncuBoost', duration: '24 months' },
];

// Resource types available
const resourceTypes: Resource[] = [
  { id: 'vc001', name: 'VC001 Introduction', type: 'video', duration: '60 mins' },
  { id: 'vc100', name: 'VC100 Product Planning Introduction', type: 'video', duration: '20 mins' },
  { id: 'vc101', name: 'VC101 Market Opportunity Analysis', type: 'video', duration: '71 mins' },
  { id: 'vc102', name: 'VC102 Segmentation and Revenue Stream', type: 'video', duration: '35 mins' },
  { id: 'a1', name: 'A1 Innovation Focus', type: 'template', format: 'Excel' },
  { id: 'a2', name: 'A2 SWOT', type: 'template', format: 'Excel' },
  { id: 'a3', name: 'A3 Market Entry Power', type: 'template', format: 'Excel' },
  { id: 'a4', name: 'A4 Customer Segments', type: 'template', format: 'Excel' },
  { id: '5year', name: '5-Year Business Plan', type: 'tool', format: 'Excel Model' },
];

// Sample milestones for Ideation program
const ideationMilestones = [
  { month: 'm3', activities: ['View Level 1', 'Submit V0-V4'] },
  { month: 'm6', activities: ['View Level 2', 'Submit V05-V10'] },
  { month: 'm9', activities: ['View Level 3', 'Submit V11-V13'] },
  { month: 'm12', activities: ['Finalize V0-13', 'AI score Assignment', 'Create Shortlist'] },
];

const IncubatorSetup: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [showCompanySelector, setShowCompanySelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('ideation');
  const [loading, setLoading] = useState(false);

  // Load company data based on companyId parameter
  useEffect(() => {
    if (companyId) {
      setLoading(true);
      // In a real app, this would be an API call
      const company = companies.find(c => c.id === Number(companyId));
      if (company) {
        setSelectedCompany(company);
      }
      setLoading(false);
    }
  }, [companyId]);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Handle company selection
  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setShowCompanySelector(false);
    // Update URL to reflect selected company
    navigate(`/incubator-setup/${company.id}`);
  };

  // Get status color for chip
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) || company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Company Selector Component
  const CompanySelector = () => (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        maxWidth: { md: 600 },
        zIndex: 1100,
        mt: 1,
        border: '1px solid',
        borderColor: 'secondary.light',
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder='Search companies...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </SearchWrapper>
      </Box>
      <Box sx={{ maxHeight: 320, overflow: 'auto', p: 1 }}>
        {filteredCompanies.length > 0 ? (
          <Box>
            {filteredCompanies.map(company => (
              <Button
                key={company.id}
                fullWidth
                sx={{
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  p: 2,
                  borderRadius: 1,
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    color: 'text.primary',
                  },
                  '&:focus': {
                    color: 'text.primary',
                  },
                  '&::selection': {
                    color: 'text.primary',
                    backgroundColor: 'secondary.main',
                  },
                }}
                onClick={() => handleSelectCompany(company)}
              >
                <Box>
                  <Typography
                    variant='body1'
                    fontWeight='medium'
                    sx={{
                      '&::selection': {
                        color: 'inherit',
                        backgroundColor: 'secondary.light',
                      },
                    }}
                  >
                    {company.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      '&::selection': {
                        color: 'inherit',
                        backgroundColor: 'secondary.light',
                      },
                    }}
                  >
                    {company.industry} • {company.phase}
                  </Typography>
                </Box>
                <Chip label={company.status} size='small' color={getStatusColor(company.status) as any} />
              </Button>
            ))}
          </Box>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>No companies found matching "{searchTerm}"</Box>
        )}
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='outlined' onClick={() => setShowCompanySelector(false)}>
          Cancel
        </Button>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => {
            setShowCompanySelector(false);
            setShowCompanyForm(true);
          }}
        >
          Add New Company
        </Button>
      </Box>
    </Paper>
  );

  // Company Form Component
  const CompanyForm = () => (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon color='secondary' />
            <Typography variant='h6'>{selectedCompany ? 'Edit Company Profile' : 'Add New Company'}</Typography>
          </Box>
        }
        subheader={selectedCompany ? `Update information for ${selectedCompany.name}` : 'Enter details to add a new company to the system'}
        action={
          <IconButton onClick={() => setShowCompanyForm(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label='Company Name' fullWidth defaultValue={selectedCompany?.name || ''} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Industry</InputLabel>
              <Select label='Industry' defaultValue={selectedCompany?.industry || ''}>
                <MenuItem value=''>Select Industry</MenuItem>
                <MenuItem value='Tech'>Tech</MenuItem>
                <MenuItem value='AgriTech'>AgriTech</MenuItem>
                <MenuItem value='HealthTech'>HealthTech</MenuItem>
                <MenuItem value='EdTech'>EdTech</MenuItem>
                <MenuItem value='FinTech'>FinTech</MenuItem>
                <MenuItem value='CleanTech'>CleanTech</MenuItem>
                <MenuItem value='RetailTech'>RetailTech</MenuItem>
                <MenuItem value='FoodTech'>FoodTech</MenuItem>
                <MenuItem value='IoT'>IoT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Initial Phase</InputLabel>
              <Select label='Initial Phase' defaultValue={selectedCompany?.phase || ''}>
                <MenuItem value=''>Select Phase</MenuItem>
                <MenuItem value='Ideation'>Ideation Program</MenuItem>
                <MenuItem value='IncuHatch'>IncuHatch</MenuItem>
                <MenuItem value='IncuBoost'>IncuBoost</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label='Founded Date'
              type='date'
              fullWidth
              defaultValue={selectedCompany ? '2024-03-01' : ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue={selectedCompany?.status || ''}>
                <MenuItem value=''>Select Status</MenuItem>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Company Description'
              multiline
              rows={3}
              fullWidth
              defaultValue={selectedCompany ? 'A technology-focused startup with innovative solutions in the market.' : ''}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant='outlined' onClick={() => setShowCompanyForm(false)}>
              Cancel
            </Button>
            <Button variant='contained' onClick={() => setShowCompanyForm(false)}>
              {selectedCompany ? 'Save Changes' : 'Add Company'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Render Empty State
  const EmptyState = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
      }}
    >
      <BusinessIcon sx={{ fontSize: 64, color: 'secondary.light', mb: 2 }} />
      <Typography variant='h5' color='secondary.dark' fontWeight='bold' sx={{ mb: 1 }}>
        No Company Selected
      </Typography>
      <Typography variant='body1' color='secondary.main' sx={{ mb: 3, maxWidth: 500 }}>
        Please select a company from the dropdown above or create a new one to configure incubator settings.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant='contained' color='secondary' startIcon={<SearchIcon />} onClick={() => setShowCompanySelector(true)}>
          Select Company
        </Button>
        <Button variant='outlined' color='secondary' startIcon={<AddIcon />} onClick={() => setShowCompanyForm(true)}>
          Add New Company
        </Button>
      </Box>
    </Box>
  );

  const renderCompanyProfile = () => (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon color='secondary' />
            <Typography variant='h6'>Company Profile</Typography>
          </Box>
        }
        subheader={`Manage basic information for ${selectedCompany?.name}`}
        action={
          <Button variant='outlined' size='small' startIcon={<EditIcon />} onClick={() => setShowCompanyForm(true)}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' fontWeight='medium' sx={{ mb: 2 }}>
              Basic Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Company Name
                </Typography>
                <Typography variant='body1' fontWeight='medium'>
                  {selectedCompany?.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Industry
                </Typography>
                <Typography variant='body1' fontWeight='medium'>
                  {selectedCompany?.industry}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Current Phase
                </Typography>
                <Typography variant='body1' fontWeight='medium'>
                  {selectedCompany?.phase}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Status
                </Typography>
                <Chip label={selectedCompany?.status} size='small' color={getStatusColor(selectedCompany?.status || '') as any} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' fontWeight='medium' sx={{ mb: 2 }}>
              Program Participation
            </Typography>
            <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box sx={{ height: 8, width: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                <Typography variant='body2' fontWeight='medium' sx={{ color: 'success.main' }}>
                  Currently Enrolled in:
                </Typography>
              </Box>
              <Typography variant='h6' fontWeight='medium' sx={{ mb: 0.5 }}>
                {selectedCompany?.phase}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Started March 1, 2024
              </Typography>
              <Typography variant='body2' sx={{ mt: 2 }} color='text.secondary'>
                145 days until completion
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                Previous Programs:
              </Typography>
              {selectedCompany?.phase === 'IncuBoost' && <Typography variant='body2'>Completed IncuHatch in Feb 2024</Typography>}
              {(selectedCompany?.phase === 'IncuBoost' || selectedCompany?.phase === 'IncuHatch') && (
                <Typography variant='body2'>Completed Ideation in Aug 2023</Typography>
              )}
              {selectedCompany?.phase === 'Ideation' && (
                <Typography variant='body2' color='text.secondary' sx={{ fontStyle: 'italic' }}>
                  No previous programs
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant='subtitle1' fontWeight='medium' sx={{ mb: 2 }}>
            Company Description
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {selectedCompany?.name} is a {selectedCompany?.industry} startup currently in the {selectedCompany?.phase} phase. They are
            focused on developing innovative solutions for the market and have shown strong potential for growth.
          </Typography>
        </Box>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant='subtitle1' fontWeight='medium'>
              Key Contacts
            </Typography>
            <Button variant='outlined' size='small' startIcon={<AddIcon />}>
              Add Contact
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant='body1' fontWeight='medium'>
                  Sarah Chen
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Founder & CEO
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                  sarah@{selectedCompany?.name.toLowerCase().replace(/\s+/g, '')}.com
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant='body1' fontWeight='medium'>
                  Michael Wong
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  CTO
                </Typography>
                <Typography variant='body2' sx={{ mt: 1 }}>
                  michael@{selectedCompany?.name.toLowerCase().replace(/\s+/g, '')}.com
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );

  const renderProgramSetup = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon color='secondary' />
                <Typography variant='h6'>Configure Program</Typography>
              </Box>
            }
            subheader={`Set up incubator program for ${selectedCompany?.name}`}
          />
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              {programTypes.map(program => (
                <Button
                  key={program.id}
                  variant={selectedProgram === program.id ? 'contained' : 'outlined'}
                  color='secondary'
                  onClick={() => setSelectedProgram(program.id)}
                  sx={{ flex: 1 }}
                >
                  {program.name}
                </Button>
              ))}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label='Program Name' fullWidth defaultValue={programTypes.find(p => p.id === selectedProgram)?.name} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label='Duration' fullWidth defaultValue={programTypes.find(p => p.id === selectedProgram)?.duration} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label='Start Date' type='date' fullWidth defaultValue='2025-01-01' InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label='End Date' type='date' fullWidth defaultValue='2025-12-31' InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={`Program Goals for ${selectedCompany?.name}`}
                  multiline
                  rows={3}
                  fullWidth
                  defaultValue={`Help ${selectedCompany?.name} develop their business model, validate their value proposition, and prepare for the next phase of growth.`}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button variant='outlined' color='secondary'>
                Cancel
              </Button>
              <Button variant='contained' color='secondary'>
                Save Program
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarIcon color='secondary' />
                <Typography variant='h6'>Program Timeline</Typography>
              </Box>
            }
            subheader='Define key milestones and deadlines'
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {selectedProgram === 'ideation' &&
                ideationMilestones.map((milestone, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      display: 'flex',
                      bgcolor: 'secondary.light',
                      border: '1px solid',
                      borderColor: 'secondary.light',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'white',
                        width: 48,
                        height: 48,
                        mr: 2,
                      }}
                    >
                      <CalendarIcon />
                    </Avatar>
                    <Box>
                      <Typography variant='subtitle2' fontWeight='medium' color='secondary.contrastText'>
                        Month {milestone.month.substring(1)}
                      </Typography>
                      <Box component='ul' sx={{ pl: 2, mb: 0, mt: 0.5 }}>
                        {milestone.activities.map((activity, idx) => (
                          <Typography component='li' variant='body2' color='secondary.contrastText' key={idx}>
                            {activity}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                ))}
              <Button variant='outlined' color='secondary' fullWidth startIcon={<AddIcon />}>
                Add Milestone
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon color='secondary' />
                <Typography variant='h6'>Program Flow Configuration</Typography>
              </Box>
            }
            subheader={`Visualize and set up the program workflow for ${selectedCompany?.name}`}
          />
          <CardContent>
            <Box
              sx={{
                bgcolor: 'secondary.light',
                p: 4,
                borderRadius: 1,
                border: '1px dashed',
                borderColor: 'secondary.main',
                height: 240,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
                  {['TT1', 'S1', 'TT2', 'P1'].map(step => (
                    <Box
                      key={step}
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        fontWeight: 'medium',
                      }}
                    >
                      {step}
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                    px: 4,
                    py: 2,
                    borderRadius: 1,
                    fontWeight: 'medium',
                    display: 'inline-block',
                  }}
                >
                  {selectedProgram === 'ideation' && 'Ideation Program'}
                  {selectedProgram === 'incuhatch' && 'IncuHatch (12 mths)'}
                  {selectedProgram === 'incuboost' && 'IncuBoost (24 mths)'}
                </Box>

                <Typography variant='body2' color='secondary.contrastText' sx={{ mt: 3 }}>
                  Drag and drop components to customize program flow
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderUserAccess = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PeopleIcon color='secondary' />
                <Typography variant='h6'>User Access Management</Typography>
              </Box>
            }
            subheader={`Manage program access rights for ${selectedCompany?.name}`}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>View Access</TableCell>
                    <TableCell>Edit Access</TableCell>
                    <TableCell>Submit Access</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Startup User</TableCell>
                    <TableCell>Sarah Chen</TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Startup User</TableCell>
                    <TableCell>Michael Wong</TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mentor</TableCell>
                    <TableCell>David Lee</TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Program Manager</TableCell>
                    <TableCell>Jennifer Tan</TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked color='secondary' />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button variant='contained' color='secondary' startIcon={<AddIcon />}>
                Add User
              </Button>
              <Button variant='outlined' color='secondary'>
                Save Permissions
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon color='secondary' />
                <Typography variant='h6'>Security Settings</Typography>
              </Box>
            }
            subheader={`Configure data privacy for ${selectedCompany?.name}`}
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel control={<Checkbox defaultChecked color='secondary' />} label='Install on VB server for data privacy' />
              <FormControlLabel
                control={<Checkbox defaultChecked color='secondary' />}
                label='Enable single sign-on for VentureEdge resources'
              />
              <FormControlLabel
                control={<Checkbox defaultChecked color='secondary' />}
                label='Remove startup identification for data privacy'
              />
              <FormControlLabel control={<Checkbox color='secondary' />} label='Share data with co-nurtured startups' />

              <Button variant='outlined' color='secondary' fullWidth sx={{ mt: 2 }}>
                Update Security Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderResources = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BookIcon color='secondary' />
                <Typography variant='h6'>Program Resources</Typography>
              </Box>
            }
            subheader={`Manage and assign resources to ${selectedCompany?.name}`}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Resource</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Format</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Assigned</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resourceTypes.map(resource => (
                    <TableRow key={resource.id}>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{resource.type}</TableCell>
                      <TableCell>{resource.format || '-'}</TableCell>
                      <TableCell>{resource.duration || '-'}</TableCell>
                      <TableCell>
                        <Checkbox
                          defaultChecked={resource.id.startsWith('vc') || resource.id === 'a1' || resource.id === 'a2'}
                          color='secondary'
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant='outlined' color='secondary' startIcon={<AddIcon />}>
                Add Custom Resource
              </Button>
              <Button variant='contained' color='secondary'>
                Save Resource Assignments
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon color='secondary' />
                <Typography variant='h6'>Resource Timeline</Typography>
              </Box>
            }
            subheader='Schedule resource availability'
          />
          <CardContent>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Resource Access Schedule
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  VC001 Introduction
                </Typography>
                <Chip
                  label='Month 1'
                  size='small'
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontSize: '0.7rem',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  VC100-VC105 Product
                </Typography>
                <Chip
                  label='Month 3-6'
                  size='small'
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontSize: '0.7rem',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  VC200-VC204 Go-to-Market
                </Typography>
                <Chip
                  label='Month 6-9'
                  size='small'
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontSize: '0.7rem',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  VC300-VC305 Operations
                </Typography>
                <Chip
                  label='Month 9-12'
                  size='small'
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontSize: '0.7rem',
                  }}
                />
              </Box>
            </Box>
            <Button variant='outlined' color='secondary' fullWidth sx={{ mt: 2 }}>
              Edit Timeline
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderScoringCriteria = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon color='secondary' />
                <Typography variant='h6'>Scoring Criteria Configuration</Typography>
              </Box>
            }
            subheader={`Define weighting for ${selectedCompany?.name}'s assessment`}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Section</TableCell>
                    <TableCell>Default Weight</TableCell>
                    <TableCell>Custom Weight</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Innovation Types</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={10} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SWOT Analysis</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={10} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Market Entry Power</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={5} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Customer Segmentation</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={5} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Revenue Stream</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={15} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cost Structure</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={15} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pricing and Margin Plan</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={10} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand Identity</TableCell>
                    <TableCell>5%</TableCell>
                    <TableCell>
                      <TextField type='number' size='small' defaultValue={5} InputProps={{ inputProps: { min: 0, max: 100 } }} />
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' size='small'>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>100%</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>100%</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Button variant='contained' color='secondary' sx={{ mt: 3 }}>
              Save Scoring Criteria
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={5}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon color='secondary' />
                <Typography variant='h6'>Events Scoring Configuration</Typography>
              </Box>
            }
            subheader='Define scoring weights for selection events'
          />
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Ideation Shortlist
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  AI scores on self-assessed VRP
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  100%
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Ideation Admission Board
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  AI scores on Self- and mentor-assessed VRP
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  30%
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  AI score on Presentation
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  20%
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  Board Interview by Panel Members
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  50%
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                IncuBoost Shortlist
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  AI scores on revised VRP
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  60%
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: 'secondary.light',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant='body2' color='white'>
                  AI score on 5-year plan
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  40%
                </Typography>
              </Box>
            </Box>

            <Button variant='outlined' color='secondary' fullWidth>
              Edit Scoring Configuration
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // Render appropriate tab content
  const renderTabContent = () => {
    // If no company is selected and not showing company form, show empty state
    if (!selectedCompany && !showCompanyForm) {
      return <EmptyState />;
    }

    // If showing company form, show it regardless of selected company
    if (showCompanyForm) {
      return <CompanyForm />;
    }

    // Otherwise show tab content for selected company
    switch (tabIndex) {
      case 0: // Company Profile
        return renderCompanyProfile();
      case 1: // Program Setup
        return renderProgramSetup();
      case 2: // User Access
        return renderUserAccess();
      case 3: // Resources
        return renderResources();
      case 4: // Scoring Criteria
        return renderScoringCriteria();
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'secondary.light',
        p: { xs: 2, sm: 4 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ChineseCharacter>范略</ChineseCharacter>
          <Box>
            <Typography variant='h4' color='secondary.contrastText' fontWeight='bold'>
              范略 VenTal Management System
            </Typography>
            <Typography variant='subtitle1' color='secondary.contrastText'>
              Where Strategy Meets Legacy
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='body2' color='secondary.contrastText'>
            Administrator
          </Typography>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>AI</Avatar>
        </Box>
      </Box>

      {/* Company Selector */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Button
          variant='contained'
          color='inherit'
          sx={{
            p: 2,
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
            width: { xs: '100%', md: '50%' },
            textAlign: 'left',
            boxShadow: 1,
            '&:hover': { bgcolor: 'background.paper' },
          }}
          endIcon={<KeyboardArrowDownIcon />}
          onClick={() => setShowCompanySelector(!showCompanySelector)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BusinessIcon color='secondary' />
            {selectedCompany ? (
              <Box>
                <Typography variant='body1' fontWeight='medium'>
                  {selectedCompany.name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {selectedCompany.industry} • {selectedCompany.phase}
                </Typography>
              </Box>
            ) : (
              <Typography color='text.secondary'>Select a company or create new...</Typography>
            )}
          </Box>
        </Button>

        {showCompanySelector && <CompanySelector />}
      </Box>

      {/* Tab Navigation */}
      <Paper
        sx={{
          mb: 4,
          borderRadius: 1,
          overflow: 'auto',
          '& .MuiTabs-flexContainer': {
            gap: { xs: 1, sm: 2 },
          },
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant='scrollable'
          scrollButtons='auto'
          sx={{ px: 1, bgcolor: 'background.paper' }}
        >
          <Tab label='Company Profile' icon={<BusinessIcon />} iconPosition='start' {...a11yProps(0)} />
          <Tab label='Program Setup' icon={<SettingsIcon />} iconPosition='start' {...a11yProps(1)} />
          <Tab label='User Access' icon={<PeopleIcon />} iconPosition='start' {...a11yProps(2)} />
          <Tab label='Resources' icon={<BookIcon />} iconPosition='start' {...a11yProps(3)} />
          <Tab label='Scoring Criteria' icon={<TimelineIcon />} iconPosition='start' {...a11yProps(4)} />
        </Tabs>
      </Paper>

      {/* Main Content */}
      {renderTabContent()}

      {/* Footer Quote */}
      {selectedCompany && !showCompanyForm && (
        <Paper
          sx={{
            mt: 6,
            p: 3,
            textAlign: 'center',
            borderColor: 'secondary.light',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant='body1' color='secondary.dark' sx={{ fontStyle: 'italic' }}>
            "Sustainable growth over rapid expansion, mentorship over isolation, resource harmony over waste."
          </Typography>
          <Typography variant='body2' color='secondary.main' sx={{ mt: 1 }}>
            — Inspired by Fan Li's business philosophy
          </Typography>
        </Paper>
      )}

      {/* Loading Backdrop */}
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
};

export default IncubatorSetup;
