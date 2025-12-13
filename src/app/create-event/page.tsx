
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Youtube,
  Calendar as CalendarIcon,
  Tag,
  List,
  Clapperboard,
  Link2,
  Save,
  Check,
  Sparkles,
  LoaderCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MessageCircle,
  Ghost
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useEvents } from '@/lib/event-store';
import type { Event } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { extractEventDetailsFromImage } from '@/ai/flows/extract-event-details';


type PostOffice = {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
};

const categories = [
    { value: 'music', label: 'Music' },
    { value: 'art', label: 'Art' },
    { value: 'food', label: 'Food' },
    { value: 'tech', label: 'Tech' },
    { value: 'sports', label: 'Sports' },
    { value: 'community', label: 'Community' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'literature', label: 'Literature' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'travel', label: 'Travel' },
  ];

const eventTags = [
    { value: 'live music', label: 'Live Music' },
    { value: 'concert', label: 'Concert' },
    { value: 'exhibition', label: 'Exhibition' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'conference', label: 'Conference' },
    { value: 'festival', label: 'Festival' },
    { value: 'marathon', label: 'Marathon' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'hackathon', label: 'Hackathon' },
];

const indianStatesAndDistricts: Record<string, string[]> = {
    "Andaman & Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", "Vizianagaram", "West Godavari", "Y.S.R. Kadapa"],
    "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
    "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    "Dadra & Nagar Haveli and Daman & Diu": ["Daman", "Diu", "Dadra and Nagar Haveli"],
    "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jammu & Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "Ladakh": ["Kargil", "Leh"],
    "Lakshadweep": ["Lakshadweep"],
    "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
    "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "S.A.S. Nagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

const states = Object.keys(indianStatesAndDistricts).map(state => ({ value: state, label: state }));
const countries = [{ value: 'India', label: 'India' }];

export default function CreateEventPage() {
  const router = useRouter();
  const { addEvent } = useEvents();
  const { toast } = useToast();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [pincodeSearchInput, setPincodeSearchInput] = useState('');
  
  // UI State
  const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);
  const [pincodeData, setPincodeData] = useState<PostOffice[]>([]);
  const [isPincodePopoverOpen, setIsPincodePopoverOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoFill = async () => {
    if (!imagePreview) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an event flyer or poster first.',
      });
      return;
    }

    setIsExtracting(true);
    try {
      const result = await extractEventDetailsFromImage({ imageDataUri: imagePreview });
      
      setTitle(result.title);
      setDescription(result.description);
      
      if (result.date) {
        try {
          // Attempt to parse as ISO string first
          let parsedDate = parseISO(result.date);
          // Check if the parsed date is valid
          if (isNaN(parsedDate.getTime())) {
            // Fallback for other common date formats
            parsedDate = new Date(result.date);
          }

          if (isNaN(parsedDate.getTime())) {
             throw new Error(`Invalid date format: ${result.date}`);
          }

          handleDateSelect(parsedDate);
        } catch (dateError) {
          console.error("Could not parse date from AI:", result.date, dateError);
          toast({
            variant: "destructive",
            title: "AI Error",
            description: `The AI suggested an invalid date: ${result.date}. Please set it manually.`
          })
        }
      }
      
      toast({
        title: 'Fields Auto-filled!',
        description: 'The event details have been extracted from the image.',
      });

    } catch (error) {
      console.error('AI extraction failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Extraction Failed',
        description: 'Could not extract details from the image. Please fill them manually.',
      });
    } finally {
      setIsExtracting(false);
    }
  };


  useEffect(() => {
    if (selectedState) {
      const districtsForState = indianStatesAndDistricts[selectedState] || [];
      setDistricts(districtsForState.map(d => ({ value: d, label: d })));
      setSelectedDistrict(''); 
    } else {
       setDistricts([]);
       setSelectedDistrict('');
    }
  }, [selectedState]);

  const handlePincodeSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPincodeSearchInput(value);

    if (value.length > 2) {
      const isPincode = /^\d{6}$/.test(value);
      const endpoint = isPincode
        ? `https://api.postalpincode.in/pincode/${value}`
        : `https://api.postalpincode.in/postoffice/${value}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data && data[0].Status === 'Success') {
          let postOffices: PostOffice[] = data[0].PostOffice;
          
          if (selectedDistrict) {
            postOffices = postOffices.filter(po => po.District.toLowerCase() === selectedDistrict.toLowerCase());
          }

          setPincodeData(postOffices);
          setIsPincodePopoverOpen(postOffices.length > 0);
          
        } else {
          setPincodeData([]);
          setIsPincodePopoverOpen(false);
        }
      } catch (error) {
        console.error('Failed to fetch location data:', error);
        setPincodeData([]);
        setIsPincodePopoverOpen(false);
      }
    } else {
      setPincodeData([]);
      setIsPincodePopoverOpen(false);
    }
  };
  
  const handlePincodeLocationSelect = (postOffice: PostOffice) => {
    if (postOffice.State && !indianStatesAndDistricts[postOffice.State]) {
      // Data from API is sometimes inconsistent, handle gracefully
      setSelectedState('');
      setSelectedDistrict('');
    } else {
      setSelectedState(postOffice.State);
      const districtsForState = indianStatesAndDistricts[postOffice.State] || [];
      setDistricts(districtsForState.map(d => ({ value: d, label: d })));
      setSelectedDistrict(postOffice.District);
    }
    setPincodeSearchInput(`${postOffice.Name}, ${postOffice.Pincode}`);
    setIsPincodePopoverOpen(false);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const newDate = new Date(selectedDate);
    
    if (date) {
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
    } else {
        newDate.setHours(new Date().getHours());
        newDate.setMinutes(new Date().getMinutes());
    }
    setDate(newDate);
  }

  const handleTimeChange = (type: 'hours' | 'minutes', value: string) => {
    const newDate = date ? new Date(date) : new Date();
    const numericValue = parseInt(value, 10);
    
    if (!isNaN(numericValue)) {
        if (type === 'hours') {
            newDate.setHours(numericValue);
        } else {
            newDate.setMinutes(numericValue);
        }
        setDate(newDate);
    }
  }

  const handleSubmit = (status: 'published' | 'draft') => {
     if (!title || !description || !date || !selectedCategory || !pincodeSearchInput) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all required fields to create an event.',
      });
      return;
    }

    const newEvent: Event = {
        id: new Date().getTime().toString(),
        title,
        description,
        date: date.toISOString(),
        location: pincodeSearchInput,
        imageUrl: imagePreview || 'https://picsum.photos/seed/default/600/400',
        imageHint: 'event image',
        organizer: {
            name: 'Guest User', // Replace with actual user data later
            avatarUrl: 'https://picsum.photos/seed/9/40/40',
        },
        category: categories.find(c => c.value === selectedCategory)?.label || 'General',
        status,
    };

    addEvent(newEvent);

    toast({
      title: `Event ${status === 'published' ? 'Published' : 'Saved'}!`,
      description: `${title} has been successfully ${status === 'published' ? 'created' : 'saved as a draft'}.`,
    });

    router.push(status === 'published' ? `/events/${newEvent.id}` : '/profile');
  }


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl">
                Create a New Event
              </CardTitle>
              <CardDescription>
                Fill out the form below to add your event to EventBee.com. Fields marked with <span className="text-destructive">*</span> are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-semibold">Event Title <span className="text-destructive">*</span></Label>
                  <Input id="title" placeholder="What's your event called?" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-lg font-semibold">Description <span className="text-destructive">*</span></Label>
                        <Textarea
                            id="description"
                            placeholder="Tell us more about your event..."
                            rows={15}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <Label htmlFor="date" className="text-lg font-semibold flex items-center">
                                <CalendarIcon className="mr-2 h-5 w-5 text-primary"/>
                                Date & Time <span className="text-destructive">*</span>
                            </Label>
                            <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP, h:mm a") : <span>Pick a date and time</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateSelect}
                                        initialFocus
                                    />
                                    <div className="p-3 border-t border-border">
                                        <div className="flex items-center justify-center gap-2">
                                            <Input
                                                type="number"
                                                min="0"
                                                max="23"
                                                className="w-16"
                                                placeholder="HH"
                                                value={date ? date.getHours().toString().padStart(2, '0') : ''}
                                                onChange={(e) => handleTimeChange('hours', e.target.value)}
                                            />
                                            <span>:</span>
                                            <Input
                                                type="number"
                                                min="0"
                                                max="59"
                                                className="w-16"
                                                placeholder="MM"
                                                value={date ? date.getMinutes().toString().padStart(2, '0') : ''}
                                                onChange={(e) => handleTimeChange('minutes', e.target.value)}
                                            />
                                            <Button size="icon" onClick={() => setIsDatePopoverOpen(false)}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-lg font-semibold flex items-center">
                                <MapPin className="mr-2 h-5 w-5 text-primary"/>
                                Location <span className="text-destructive">*</span>
                            </Label>
                            <div className="space-y-4 rounded-md border p-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label>Country</Label>
                                    <Combobox
                                        items={countries}
                                        value={selectedCountry}
                                        onValueChange={setSelectedCountry}
                                        placeholder="Select country..."
                                        searchPlaceholder="Search countries..."
                                        noResultsText="No countries found."
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label>State</Label>
                                    <Combobox 
                                        items={states}
                                        placeholder="Select state..."
                                        searchPlaceholder="Search states..."
                                        noResultsText="No states found."
                                        value={selectedState}
                                        onValueChange={setSelectedState}
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label>District</Label>
                                    <Combobox 
                                        items={districts}
                                        placeholder="Select district..."
                                        searchPlaceholder="Search districts..."
                                        noResultsText="Select a state first."
                                        value={selectedDistrict}
                                        onValueChange={setSelectedDistrict}
                                        
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="area-pincode">Area / Pincode <span className="text-destructive">*</span></Label>
                                    <Popover open={isPincodePopoverOpen} onOpenChange={setIsPincodePopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <Input 
                                                id="area-pincode" 
                                                placeholder="e.g. Connaught Place or 110001"
                                                value={pincodeSearchInput}
                                                onChange={handlePincodeSearchChange}
                                                autoComplete="off"
                                            />
                                        </PopoverTrigger>
                                        {pincodeData.length > 0 && (
                                        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                                            <ul className="max-h-60 overflow-y-auto">
                                            {pincodeData.map((po, index) => (
                                                <li 
                                                key={`${po.Name}-${po.Pincode}-${index}`}
                                                className="cursor-pointer p-2 hover:bg-muted"
                                                onClick={() => handlePincodeLocationSelect(po)}
                                                >
                                                <p className="font-semibold">{po.Name}, {po.Pincode}</p>
                                                <p className="text-sm text-muted-foreground">{po.District}, {po.State}</p>
                                                </li>
                                            ))}
                                            </ul>
                                        </PopoverContent>
                                        )}
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold flex items-center">
                            <List className="mr-2 h-5 w-5 text-primary"/>
                            Category <span className="text-destructive">*</span>
                        </Label>
                        <Combobox
                            items={categories}
                            placeholder="Select a category..."
                            searchPlaceholder="Search categories..."
                            noResultsText="No categories found."
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold flex items-center">
                            <Tag className="mr-2 h-5 w-5 text-primary"/>
                            Tags
                        </Label>
                        <MultiSelectCombobox
                            items={eventTags}
                            placeholder="Add relevant tags..."
                            searchPlaceholder="Search or create tags..."
                            noResultsText="No tags found."
                            selectedValues={selectedTags}
                            onSelectedValuesChange={setSelectedTags}
                            allowFreeText
                        />
                    </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5 text-primary" />
                    Event Image
                  </Label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative h-48 w-full max-w-sm flex-shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-border">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Event preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-muted text-muted-foreground">
                          <ImageIcon className="h-10 w-10" />
                          <p className="mt-2 text-sm">Image Preview</p>
                        </div>
                      )}
                    </div>
                    <div className="w-full space-y-2">
                      <Label htmlFor="image-upload" className="sr-only">Upload Image</Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer file:cursor-pointer file:font-medium file:text-primary hover:file:text-primary/80"
                      />
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, GIF up to 10MB. Recommended: 1200x628px.
                      </p>
                       <Button 
                        onClick={handleAutoFill} 
                        disabled={!imagePreview || isExtracting} 
                        className="w-full sm:w-auto"
                        variant="outline"
                        >
                        {isExtracting ? (
                          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <Sparkles className="mr-2 h-5 w-5" />
                        )}
                        Auto-fill with AI
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                        <LinkIcon className="mr-2 h-5 w-5 text-primary"/>
                        Optional Links
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="youtube" className="flex items-center text-muted-foreground">
                                <Youtube className="mr-2 h-4 w-4"/>
                                YouTube
                            </Label>
                            <Input id="youtube" placeholder="https://youtube.com/your-channel" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facebook" className="flex items-center text-muted-foreground">
                                <Facebook className="mr-2 h-4 w-4"/>
                                Facebook
                            </Label>
                            <Input id="facebook" placeholder="https://facebook.com/your-page" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instagram" className="flex items-center text-muted-foreground">
                                <Instagram className="mr-2 h-4 w-4"/>
                                Instagram
                            </Label>
                            <Input id="instagram" placeholder="https://instagram.com/your-profile" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="x-platform" className="flex items-center text-muted-foreground">
                                <Twitter className="mr-2 h-4 w-4"/>
                                X (Twitter)
                            </Label>
                            <Input id="x-platform" placeholder="https://x.com/your-handle" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin" className="flex items-center text-muted-foreground">
                                <Linkedin className="mr-2 h-4 w-4"/>
                                LinkedIn
                            </Label>
                            <Input id="linkedin" placeholder="https://linkedin.com/in/your-profile" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp" className="flex items-center text-muted-foreground">
                                <MessageCircle className="mr-2 h-4 w-4"/>
                                WhatsApp
                            </Label>
                            <Input id="whatsapp" type="tel" placeholder="Your WhatsApp group link or number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="snapchat" className="flex items-center text-muted-foreground">
                                <Ghost className="mr-2 h-4 w-4"/>
                                Snapchat
                            </Label>
                            <Input id="snapchat" placeholder="Your Snapchat username or link" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website" className="flex items-center text-muted-foreground">
                                <Link2 className="mr-2 h-4 w-4"/>
                                Reference/Website Link
                            </Label>
                            <Input id="website" placeholder="https://example.com" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-end gap-4 pt-4">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => handleSubmit('draft')}>
                    <Save className="mr-2 h-5 w-5" />
                    Save as Draft
                  </Button>
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => handleSubmit('published')}>
                    <Clapperboard className="mr-2 h-5 w-5" />
                    Create & Publish Event
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

    