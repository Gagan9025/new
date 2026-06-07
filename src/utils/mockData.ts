export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Living Room' | 'Bedroom' | 'Office' | 'Dining' | 'Outdoor';
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  features: string[];
  isFeatured?: boolean;
}

export interface TempoVehicle {
  id: string;
  name: string;
  type: string;
  capacity: string;
  basePrice: number;
  pricePerKm: number;
  image: string;
  description: string;
  available: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: 'Living Room' | 'Kitchen' | 'Office' | 'Bedroom' | 'Commercial';
  image: string;
  client: string;
  duration: string;
  cost: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
}

export interface CMSContent {
  heroTitle: string;
  heroSubtitle: string;
  contactPhone: string;
  contactEmail: string;
  contactWhatsapp: string;
  officeAddress: string;
  banners: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

export interface LeaveRequest {
  id: string;
  type: 'Sick Leave' | 'Casual Leave' | 'Earned Leave';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Payslip {
  id: string;
  month: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  generatedDate: string;
  status: 'Paid' | 'Pending';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Designer' | 'Driver' | 'Delivery' | 'Support';
  avatar: string;
  phone: string;
  attendance: {
    status: 'Present' | 'Absent' | 'On Leave' | 'Clocked Out';
    clockIn?: string;
    clockOut?: string;
    history: { date: string; status: 'Present' | 'Absent' | 'On Leave'; clockIn?: string; clockOut?: string }[];
  };
  leaves: LeaveRequest[];
  salary: {
    base: number;
    bonus: number;
    deductions: number;
    history: Payslip[];
  };
  assignedTasks: Task[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  addresses: string[];
  activityLogs: { date: string; action: string }[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Packing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  date: string;
}

export interface TempoBooking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleId: string;
  vehicleName: string;
  pickupAddress: string;
  dropAddress: string;
  date: string;
  time: string;
  distanceKm: number;
  totalCost: number;
  status: 'Pending' | 'Assigned' | 'In Transit' | 'Completed' | 'Cancelled';
  assignedDriverId?: string;
  assignedDriverName?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: 'Tempo' | 'Furniture' | 'Interior' | 'General';
  message: string;
  status: 'Pending' | 'Resolved';
  date: string;
  replyText?: string;
}

// Initial seed data in Indian Home Style and Rupees (INR)
export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Maharaja Solid Sheesham Wood Chesterfield Sofa',
    description: 'An elegant Chesterfield 3-seater sofa handcrafted in solid Sheesham wood. Upholstered in premium royal blue velvet, featuring classic deep button tufting and brass rivets.',
    price: 42000,
    category: 'Living Room',
    rating: 4.8,
    reviewsCount: 124,
    stock: 8,
    image: '/sofa_indian.png',
    features: ['Premium Velvet Fabric', 'Solid Seasoned Sheesham Wood', 'High-Density Sleepwell Foam', 'Traditional Brass Stud detailing'],
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Handcrafted Jaipur Brass-Inlay Coffee Table',
    description: 'Beautiful coffee table crafted from seasoned teakwood featuring intricate traditional Rajasthani brass inlay work and high-gloss protective finish.',
    price: 8500,
    category: 'Living Room',
    rating: 4.6,
    reviewsCount: 42,
    stock: 2,
    image: '/coffee_table_indian.png',
    features: ['Teakwood Frame', 'Intricate Jaipur Brass Inlay', 'Storage shelf for newspapers', 'Handcrafted by national award artisans'],
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'Ortho-Support Ergonomic High-Back Office Chair',
    description: 'High-performance office chair tailored for Indian workspace shifts, offering breathable mesh backing, adjustable lumbar cushioning, and 3D armrests.',
    price: 9500,
    category: 'Office',
    rating: 4.9,
    reviewsCount: 89,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=60',
    features: ['Adjustable Synchro-Tilt Action', 'Pneumatic Class-4 Gas Lift', 'Heavy-Duty Steel Base', 'Breathable Double Mesh Netting'],
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'Royal Jodhpur Teak Wood King Size Platform Bed',
    description: 'A grand bedroom centerpiece made of pure Jodhpur teak wood with traditional lattice work (Jaali) on the headboard and deep storage boxes.',
    price: 35000,
    category: 'Bedroom',
    rating: 4.7,
    reviewsCount: 65,
    stock: 4,
    image: '/bed_indian.png',
    features: ['Grade-A Malabar Teak Wood', 'Traditional Lattice Headboard', 'Dual-side deep box storage drawers', 'Termite resistant finish']
  },
  {
    id: 'prod-5',
    name: 'Makrana Marble Top 6-Seater Dining Table',
    description: 'Stunning dining room centerpiece matching a heavy white Makrana marble stone tabletop with solid wood legs and hand-carved details.',
    price: 48000,
    category: 'Dining',
    rating: 4.5,
    reviewsCount: 38,
    stock: 5,
    image: '/dining_table_indian.png',
    features: ['Makrana White Marble top', 'Polished Teak Support Pillars', 'Accommodates up to 6 people', 'Heat and spill resistant glaze']
  },
  {
    id: 'prod-6',
    name: 'Kerala Coir Traditional Recliner Lounger',
    description: 'An outdoor lounge chair crafted using weather-proof Nilambur teak wood with traditional woven coir rope backing for natural ventilation.',
    price: 11500,
    category: 'Outdoor',
    rating: 4.4,
    reviewsCount: 22,
    stock: 1,
    image: '/kerala_lounger.png',
    features: ['100% Organic Nilambur Teak', 'Adjustable 4-stage backrest inclination', 'Hand-woven organic coir support', 'Lightweight and portable']
  }
];

export const initialVehicles: TempoVehicle[] = [
  {
    id: 'veh-2',
    name: 'Mahindra Bolero Pickup Truck',
    type: 'Medium Flatbed Cargo',
    capacity: '1.5 Tons max',
    basePrice: 500,
    pricePerKm: 25,
    image: 'https://images.unsplash.com/photo-1516576881958-3d14cc9fde84?w=800&auto=format&fit=crop&q=60',
    description: 'Excellent for shifting 1-2 BHK apartments, delivery of multiple heavy tables/beds, and corporate deliveries.',
    available: true
  },
  {
    id: 'veh-4',
    name: 'Sre Garuda Tractor Service (Tamil Nadu)',
    type: 'Agricultural & Cargo Hauling',
    capacity: '3.5 Tons max',
    basePrice: 1200,
    pricePerKm: 30,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60',
    description: 'Sre Garuda heavy-duty tractor operations across Tamil Nadu. Present market fixed rate for agricultural hauling, construction sand transport, and brick loads.',
    available: true
  },
  {
    id: 'veh-5',
    name: 'Sre Garuda JCB Excavator Service',
    type: 'Earthmoving & Excavation Works',
    capacity: '7.5 Tons Operating Weight',
    basePrice: 2000,
    pricePerKm: 50,
    image: 'https://images.unsplash.com/photo-1579298285566-a36c53cd4cc6?w=800&auto=format&fit=crop&q=60',
    description: 'Sre Garuda JCB loaders for site excavation, leveling, foundation construction, demolition, and debris removal with hourly-equivalent fixed distance fares.',
    available: true
  }
];

export const initialProjects: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Traditional Jodhpur Heritage Living Room',
    description: 'Blending Rajasthani ethnic vibes with modern luxury layouts. Highlights include distressed jharokha mirrors, block-printed drapes, and Sheesham sofa units.',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60',
    client: 'Aditya Birla Group',
    duration: '3 Months',
    cost: 450000
  },
  {
    id: 'proj-2',
    title: 'Sleek Vastu-Compliant Modular Kitchen',
    description: 'A high-gloss kitchen design featuring intelligent pull-out pantries, quartz countertops, chimney hood ventilation, and handleless wooden panels.',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=60',
    client: 'Sneha & Raj Mehta',
    duration: '2 Months',
    cost: 280000
  },
  {
    id: 'proj-3',
    title: 'Next-Gen IT Hub Collaborative Workspace',
    description: 'Collaborative desk cluster in Bengaluru featuring acoustic panels, dynamic height desks, private cabins, and open biophilic meeting lounges.',
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60',
    client: 'Zenith Tech Labs',
    duration: '5 Months',
    cost: 1200000
  },
  {
    id: 'proj-4',
    title: 'Cozy Bohemian Bedroom Haven (Bengaluru Flat)',
    description: 'Warm, bright bedroom featuring woven cane headboard inserts, macrame wall hangings, natural wood wardrobes, and warm ambient accent lights.',
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=60',
    client: 'Dr. Anjali Deshmukh',
    duration: '1.5 Months',
    cost: 180000
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Vikram Malhotra',
    role: 'Co-Founder, TechRise Bengaluru',
    review: 'We hired their interior team for our new 5,000 sqft office and also purchased all desks through the store. The coordination was seamless! They delivered the furniture using their own tempo service, which was incredibly efficient.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60'
  },
  {
    id: 'test-2',
    name: 'Priyanka Sen',
    role: 'Homeowner, Gurugram',
    review: 'Extremely satisfied with the Maharaja Sheesham Chesterfield sofa! Its the crown jewel of our living room. Also booked a Tata Ace to relocate some of my old family wardrobes; the driver arrived on time and handled it with care.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60'
  },
  {
    id: 'test-3',
    name: 'Rohan Sharma',
    role: 'Freelancer, Noida',
    review: 'The orthodontic workspace chair is a lifesaver. Shipped quickly within Delhi-NCR and arrived pre-assembled. Solid 5-star experience!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60'
  }
];

export const initialCMS: CMSContent = {
  heroTitle: 'Intelligent Space. Seamless Logistics. Premium Indian Living.',
  heroSubtitle: 'Connecting local city freight transport, high-end Vastu-compliant home interior shuffles, and a hand-crafted solid wood furniture marketplace.',
  contactPhone: '+91 98765 43210',
  contactEmail: 'support@royalscompany.com',
  contactWhatsapp: '+91 98765 43210',
  officeAddress: '102, Premium Tower, Sector 62, Noida, UP, India',
  banners: [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop&q=80'
  ]
};

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Gagan Gupta',
    email: 'gagan@gmail.com',
    phone: '+91 99999 88888',
    joinedDate: '2026-01-15',
    addresses: ['Flat 402, Royal Enclave, New Delhi', 'Sector 15, Tech Hub, Gurugram'],
    activityLogs: [
      { date: '2026-06-07 10:00', action: 'Logged in to portal' },
      { date: '2026-06-07 11:30', action: 'Ordered Maharaja Chesterfield Sofa' },
      { date: '2026-06-07 12:00', action: 'Requested Tata Ace Booking' }
    ]
  },
  {
    id: 'cust-2',
    name: 'Meera Nair',
    email: 'meera.nair@example.com',
    phone: '+91 88888 77777',
    joinedDate: '2026-03-22',
    addresses: ['Villa 18, Palm Meadows, Bengaluru'],
    activityLogs: [
      { date: '2026-06-05 14:15', action: 'Completed Consultation Request' }
    ]
  }
];

export const initialEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Rajesh Kumar',
    email: 'rajesh@tempo.com',
    role: 'Driver',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=60',
    phone: '+91 97777 55555',
    attendance: {
      status: 'Clocked Out',
      history: [
        { date: '2026-06-05', status: 'Present', clockIn: '09:00', clockOut: '18:00' },
        { date: '2026-06-06', status: 'Present', clockIn: '08:50', clockOut: '18:10' }
      ]
    },
    leaves: [],
    salary: {
      base: 22000,
      bonus: 1500,
      deductions: 500,
      history: [
        { id: 'pay-1', month: 'May 2026', baseSalary: 22000, bonus: 1000, deductions: 200, netSalary: 22800, generatedDate: '2026-05-31', status: 'Paid' }
      ]
    },
    assignedTasks: [
      { id: 'task-1', title: 'Pickup Sofa delivery', description: 'Deliver Maharaja Chesterfield Sofa to Flat 402, New Delhi', status: 'Pending', dueDate: '2026-06-08' }
    ]
  },
  {
    id: 'emp-2',
    name: 'Aisha Sen',
    email: 'aisha@tempo.com',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60',
    phone: '+91 96666 44444',
    attendance: {
      status: 'Present',
      clockIn: '09:15',
      history: [
        { date: '2026-06-05', status: 'Present', clockIn: '09:30', clockOut: '17:30' },
        { date: '2026-06-06', status: 'Present', clockIn: '09:10', clockOut: '18:00' }
      ]
    },
    leaves: [
      { id: 'l-1', type: 'Sick Leave', startDate: '2026-06-10', endDate: '2026-06-11', reason: 'Medical appointment', status: 'Pending' }
    ],
    salary: {
      base: 45000,
      bonus: 3000,
      deductions: 1000,
      history: [
        { id: 'pay-2', month: 'May 2026', baseSalary: 45000, bonus: 2000, deductions: 500, netSalary: 46500, generatedDate: '2026-05-31', status: 'Paid' }
      ]
    },
    assignedTasks: [
      { id: 'task-2', title: 'Living Room Consultation', description: 'Consult with client Gagan Gupta for biophilic layout', status: 'In Progress', dueDate: '2026-06-09' }
    ]
  },
  {
    id: 'emp-3',
    name: 'Arjun Das',
    email: 'arjun@tempo.com',
    role: 'Support',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    phone: '+91 95555 33333',
    attendance: {
      status: 'Present',
      clockIn: '08:45',
      history: [
        { date: '2026-06-05', status: 'Present', clockIn: '09:00', clockOut: '18:00' },
        { date: '2026-06-06', status: 'Present', clockIn: '08:45', clockOut: '18:00' }
      ]
    },
    leaves: [],
    salary: {
      base: 28000,
      bonus: 500,
      deductions: 0,
      history: [
        { id: 'pay-3', month: 'May 2026', baseSalary: 28000, bonus: 500, deductions: 0, netSalary: 28500, generatedDate: '2026-05-31', status: 'Paid' }
      ]
    },
    assignedTasks: [
      { id: 'task-3', title: 'Resolve Enquiry #eq-1', description: 'Follow up with Meera Nair regarding interior design packages', status: 'Pending', dueDate: '2026-06-08' }
    ]
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-1001',
    customerId: 'cust-1',
    customerName: 'Gagan Gupta',
    customerEmail: 'gagan@gmail.com',
    items: [
      {
        productId: 'prod-1',
        name: 'Maharaja Solid Sheesham Wood Chesterfield Sofa',
        quantity: 1,
        price: 42000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60'
      }
    ],
    totalAmount: 42000,
    status: 'Pending',
    shippingAddress: 'Flat 402, Royal Enclave, New Delhi',
    paymentMethod: 'Credit Card',
    date: '2026-06-07 11:30'
  }
];

export const initialBookings: TempoBooking[] = [
  {
    id: 'BKG-2001',
    customerId: 'cust-1',
    customerName: 'Gagan Gupta',
    customerPhone: '+91 99999 88888',
    vehicleId: 'veh-2',
    vehicleName: 'Mahindra Bolero Pickup Truck',
    pickupAddress: 'Shop #12, Furniture Market, Kirti Nagar, Delhi',
    dropAddress: 'Flat 402, Royal Enclave, New Delhi',
    date: '2026-06-08',
    time: '14:00',
    distanceKm: 18,
    totalCost: 950, // base 500 + (18 * 25) = 950
    status: 'Pending'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'ENQ-3001',
    name: 'Meera Nair',
    email: 'meera.nair@example.com',
    phone: '+91 88888 77777',
    serviceType: 'Interior',
    message: 'I would like to request a consultation for renovating my 3BHK villa in Bengaluru. Please share the pricing details.',
    status: 'Pending',
    date: '2026-06-05 14:15'
  }
];
