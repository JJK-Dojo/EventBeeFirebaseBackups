
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Youtube,
  CalendarIcon,
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
  Ghost,
  FileUp,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react';
import { format, parse, parseISO } from 'date-fns';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Combobox } from '@/components/ui/combobox';
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import type { Event } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { extractEventDetailsFromImage } from '@/ai/flows/extract-event-details';
import { DUMMY_EVENTS } from '@/lib/data';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useUser } from '@/firebase/auth/use-user';
import Image from 'next/image';

type PostOffice = {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
};

const visibilityOptions = [
    { value: 'public', label: 'Public (Submitted for Review)' },
    { value: 'private', label: 'Private (Saved as Draft)' }
];

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
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

const states = Object.keys(indianStatesAndDistricts).map(state => ({ value: state, label: state }));
const countries = [{ value: 'India', label: 'India' }];

// Function to robustly parse date strings from AI
const parseDateString = (dateString: string): Date | null => {
    if (!dateString) return null;
    // Try ISO format first, as it's the most reliable
    let date = parseISO(dateString);
    if (!isNaN(date.getTime())) return date;
    
    const formats = [
        'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd', 'MM-dd-yyyy',
        'dd-MM-yyyy', 'MMMM d, yyyy', 'd MMMM yyyy', 'yyyy, MMMM d',
        'MMMM d yyyy', 'M/d/yy', 'M/d/yyyy',
    ];
    for (const format of formats) {
        date = parse(dateString, format, new Date());
        if (!isNaN(date.getTime())) return date;
    }
    date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;
    return null;
}

// Function to convert an image to a JPEG data URI
const toJpegDataURL = (dataUrl: string, quality = 0.9): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Could not get canvas context'));
            }
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = (err) => reject(err);
        img.src = dataUrl;
    });
};


export default function CreateEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user, isLoading: isUserLoading } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  // Form State
  const [visibility, setVisibility] = useState('public');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [pincodeSearchInput, setPincodeSearchInput] = useState('');
  
  // UI State
  const [pincodeData, setPincodeData] = useState<PostOffice[]>([]);
  const [isPincodePopoverOpen, setIsPincodePopoverOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const districts = useMemo(() => {
    if (selectedState) {
      const districtsForState = indianStatesAndDistricts[selectedState] || [];
      return districtsForState.map(d => ({ value: d, label: d }));
    }
    return [];
  }, [selectedState]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  
  useEffect(() => {
    const eventId = searchParams.get('edit');
    if (eventId) {
      const foundEvent = DUMMY_EVENTS.find(e => e.id === eventId);
      if (foundEvent) {
        setIsEditing(true);
        setEventToEdit(foundEvent);
        setVisibility(foundEvent.status === 'draft' ? 'private' : 'public');
        setTitle(foundEvent.title);
        setDescription(foundEvent.description);
        setDate(new Date(foundEvent.date));
        setSelectedCategory(foundEvent.category);
        setImagePreviews([foundEvent.imageUrl]);
        setSelectedTags(foundEvent.tags || []);
        setPincodeSearchInput(foundEvent.location);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // When the state changes, we should reset the selected district.
    setSelectedDistrict('');
  }, [selectedState]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      const promises = Array.from(files).map(file => {
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result as string);
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(() => {
        setImagePreviews(prev => [...prev, ...newPreviews]);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews(previews => previews.filter((_, i) => i !== index));
  }

  const handleAutoFill = async () => {
    if (imagePreviews.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an event flyer or poster first.',
      });
      return;
    }

    setIsExtracting(true);
    try {
      const jpegDataUri = await toJpegDataURL(imagePreviews[0]);
      const result = await extractEventDetailsFromImage({ imageDataUri: jpegDataUri });
      
      setTitle(result.title);
      setDescription(result.description);
      
      if (result.date) {
        const parsedDate = parseDateString(result.date);
        
        if (parsedDate) {
          handleDateSelect(parsedDate);
        } else {
           console.error("Could not parse date from AI:", result.date);
          toast({
            variant: "destructive",
            title: "AI Error: Invalid Date",
            description: `The AI suggested a date format that could not be understood: "${result.date}". Please set the date manually.`
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
      setSelectedState('');
      setSelectedDistrict('');
    } else {
      setSelectedState(postOffice.State);
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

  const handleSubmit = async () => {
    if (!firestore || !user) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to create an event.",
        });
        return;
    }
    setIsSubmitting(true);
    try {
        const newStatus = visibility === 'public' ? 'pending' : 'draft';

        const getBrandedImageUrl = () => {
            const seed = '12345'; // Static seed
            return `https://picsum.photos/seed/${seed}/600/400`;
        };
        
        const finalImageUrl = imagePreviews.length > 0 ? imagePreviews[0] : getBrandedImageUrl();
        
        const eventCollectionRef = collection(firestore, 'events');
        const newEventRef = doc(eventCollectionRef);
        
        const eventData = {
            id: newEventRef.id,
            userId: user.uid,
            title,
            description,
            date: date ? date.toISOString() : new Date().toISOString(),
            location: pincodeSearchInput,
            imageUrl: finalImageUrl,
            imageHint: 'event image', // Consider generating this with AI or from tags
            organizer: {
                id: user.uid,
                name: user.displayName || 'Anonymous Contributor',
                avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
            },
            category: categories.find(c => c.value === selectedCategory)?.label || 'General',
            tags: selectedTags,
            status: newStatus,
            editCount: 0,
            createdAt: serverTimestamp(),
            // Storing multiple image URLs would require a schema change.
            // For now, only the first image is saved.
        };

        if (isEditing && eventToEdit) {
          // Update logic will go here
          console.log('Simulating update for event:', eventToEdit.id);
          toast({
            title: `Event ${newStatus === 'pending' ? 'Resubmitted' : 'Updated'}!`,
            description: `${title} has been successfully updated.`,
          });
          router.push('/profile');
        } else {
          await setDoc(newEventRef, eventData);
          console.log("Document written with ID: ", newEventRef.id);
          
          toast({
            title: `Event ${newStatus === 'pending' ? 'Submitted' : 'Saved'}!`,
            description: `${title} has been successfully saved.`,
          });
          router.push(newStatus === 'draft' ? '/profile' : '/find-events');
        }
    } catch (error) {
        console.error('Error adding document: ', error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "Could not save the event. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }


  if (isUserLoading) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            </main>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl">
                {isEditing ? 'Edit Your Event' : 'Create a New Event'}
              </CardTitle>
              <CardDescription>
                {isEditing ? 'Update the details for your event below.' : 'Fill out the form below to submit your event for review.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                
                 {isEditing && eventToEdit?.status === 'denied' && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Event Denied</AlertTitle>
                    <AlertDescription>
                      Your event was denied for the following reason: <br/>
                      <span className="font-medium">"{eventToEdit.feedback || 'No feedback provided.'}"</span>
                      <br/> Please make the necessary changes and resubmit.
                      ({eventToEdit.editCount}/5 edits used)
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                    <Label className="text-lg font-semibold flex items-center">
                        <Eye className="mr-2 h-5 w-5 text-primary"/>
                        Event Visibility
                    </Label>
                    <Combobox
                        items={visibilityOptions}
                        value={visibility}
                        onValueChange={setVisibility}
                    />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-semibold">Event Title</Label>
                  <Input id="title" placeholder="What's your event called?" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
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
                                Date & Time
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
                                Location
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
                                    <Label htmlFor="area-pincode">Area / Pincode</Label>
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
                            Category
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
                    Event Images
                  </Label>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative aspect-video group">
                                <Image
                                src={src}
                                alt={`Event preview ${index + 1}`}
                                fill
                                className="object-cover rounded-md border"
                                />
                                <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(index)}
                                >
                                <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}

                        <Label 
                            htmlFor="image-upload" 
                            className="flex flex-col items-center justify-center aspect-video w-full cursor-pointer rounded-lg border-2 border-dashed border-border text-muted-foreground hover:bg-muted"
                        >
                            <FileUp className="h-8 w-8" />
                            <span className="mt-2 text-sm text-center">Add Images</span>
                        </Label>
                    </div>
                    <div className="w-full space-y-2">
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        multiple
                      />
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, GIF up to 10MB. Recommended: 1200x628px. The first image will be the main event banner.
                      </p>
                       <Button 
                        onClick={handleAutoFill} 
                        disabled={imagePreviews.length === 0 || isExtracting} 
                        className="w-full sm:w-auto"
                        variant="outline"
                        >
                        {isExtracting ? (
                          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <Sparkles className="mr-2 h-5 w-5" />
                        )}
                        Auto-fill with AI (uses first image)
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
                  <Button size="lg" className="w-full sm:w-auto" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? <LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                    {isEditing ? 'Save Changes' : 'Save Event'}
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

    

    

    