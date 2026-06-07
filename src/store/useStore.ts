import { create } from 'zustand';
import {
  Product,
  TempoVehicle,
  PortfolioProject,
  Testimonial,
  CMSContent,
  Employee,
  Customer,
  Order,
  TempoBooking,
  Enquiry,
  initialProducts,
  initialVehicles,
  initialProjects,
  initialTestimonials,
  initialCMS,
  initialCustomers,
  initialEmployees,
  initialOrders,
  initialBookings,
  initialEnquiries,
  OrderItem,
  Payslip,
  LeaveRequest,
  Task
} from '../utils/mockData';

// Custom structure for cart items
export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  // Database Tables
  products: Product[];
  vehicles: TempoVehicle[];
  projects: PortfolioProject[];
  testimonials: Testimonial[];
  cms: CMSContent;
  customers: Customer[];
  employees: Employee[];
  orders: Order[];
  bookings: TempoBooking[];
  enquiries: Enquiry[];

  // User Session
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: 'Customer' | 'Employee' | 'Admin';
    details?: Employee | Customer;
  } | null;

  // Cart & Wishlist
  cart: CartItem[];
  wishlist: Product[];

  // Theme
  isDarkMode: boolean;

  // Actions
  toggleTheme: () => void;

  // Authentication Actions
  login: (email: string, role: 'Customer' | 'Employee' | 'Admin') => boolean;
  logout: () => void;
  registerCustomer: (name: string, email: string, phone: string, address: string) => boolean;

  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;

  // Customer Management (Admin)
  addCustomer: (cust: Omit<Customer, 'id' | 'joinedDate' | 'activityLogs'>) => void;
  editCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  logCustomerActivity: (customerId: string, action: string) => void;

  // Employee Management (Admin & Employee)
  addEmployee: (emp: Omit<Employee, 'id' | 'attendance' | 'leaves' | 'assignedTasks' | 'salary'> & { baseSalary: number }) => void;
  editEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  // Attendance & Leaves (Employee / Admin)
  clockIn: (employeeId: string) => void;
  clockOut: (employeeId: string) => void;
  requestLeave: (employeeId: string, leave: { type: 'Sick Leave' | 'Casual Leave' | 'Earned Leave'; startDate: string; endDate: string; reason: string }) => void;
  updateLeaveStatus: (employeeId: string, leaveId: string, status: 'Approved' | 'Rejected') => void;
  
  // Tasks (Admin & Employee)
  assignTask: (employeeId: string, taskTitle: string, desc: string, dueDate: string) => void;
  updateTaskStatus: (employeeId: string, taskId: string, status: 'Pending' | 'In Progress' | 'Completed') => void;

  // Payroll Management (Admin)
  addPayslip: (employeeId: string, payslip: Omit<Payslip, 'id' | 'generatedDate'>) => void;
  updateSalaryStructure: (employeeId: string, base: number, bonus: number, deductions: number) => void;

  // Inventory Management (Admin)
  addProduct: (product: Omit<Product, 'id'>) => void;
  editProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Order Management (Customer, Admin & Employee)
  placeOrder: (shippingAddress: string, paymentMethod: string) => { success: boolean; orderId?: string };
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  assignOrderEmployee: (orderId: string, employeeId: string) => void;

  // Tempo Booking Management (Customer, Admin & Employee)
  bookTempo: (bookingData: {
    vehicleId: string;
    vehicleName: string;
    pickupAddress: string;
    dropAddress: string;
    date: string;
    time: string;
    distanceKm: number;
    totalCost: number;
  }) => void;
  assignBookingDriver: (bookingId: string, driverId: string) => void;
  updateBookingStatus: (bookingId: string, status: TempoBooking['status']) => void;

  // Interior Design Management (Admin)
  addProject: (proj: Omit<PortfolioProject, 'id'>) => void;
  editProject: (id: string, updates: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;

  // Enquiries
  submitEnquiry: (enq: Omit<Enquiry, 'id' | 'status' | 'date'>) => void;
  replyEnquiry: (id: string, replyText: string) => void;

  // CMS Content Management (Admin)
  updateCMS: (updates: Partial<CMSContent>) => void;
}

// Read initial states from LocalStorage or fall back
const getLocal = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(`tempo_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setLocal = (key: string, data: any) => {
  try {
    localStorage.setItem(`tempo_${key}`, JSON.stringify(data));
  } catch (e) {}
};

export const useStore = create<AppState>((set, get) => ({
  // Load states
  products: getLocal('products', initialProducts),
  vehicles: initialVehicles,
  projects: getLocal('projects', initialProjects),
  testimonials: getLocal('testimonials', initialTestimonials),
  cms: getLocal('cms', initialCMS),
  customers: getLocal('customers', initialCustomers),
  employees: getLocal('employees', initialEmployees),
  orders: getLocal('orders', initialOrders),
  bookings: getLocal('bookings', initialBookings),
  enquiries: getLocal('enquiries', initialEnquiries),

  currentUser: getLocal('currentUser', null),
  cart: getLocal('cart', []),
  wishlist: getLocal('wishlist', []),
  isDarkMode: getLocal('isDarkMode', true), // Default Dark Mode for premium look

  toggleTheme: () => {
    const nextTheme = !get().isDarkMode;
    set({ isDarkMode: nextTheme });
    setLocal('isDarkMode', nextTheme);
    // Reflect in document element
    if (nextTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // Auth Operations
  login: (email, role) => {
    let userFound = false;
    let loggedInUser = null;

    if (role === 'Admin') {
      if (email.toLowerCase().includes('admin')) {
        userFound = true;
        loggedInUser = { id: 'admin-1', name: 'Super Administrator', email, role: 'Admin' as const };
      }
    } else if (role === 'Employee') {
      const emp = get().employees.find(e => e.email.toLowerCase() === email.toLowerCase());
      if (emp) {
        userFound = true;
        loggedInUser = { id: emp.id, name: emp.name, email: emp.email, role: 'Employee' as const, details: emp };
      }
    } else {
      // Customer
      const cust = get().customers.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (cust) {
        userFound = true;
        loggedInUser = { id: cust.id, name: cust.name, email: cust.email, role: 'Customer' as const, details: cust };
      } else {
        // Auto register if email looks normal, just for testing ease (or user can register explicitly)
        // Let's check if they exist or just auto-create them to prevent login blocking
        const namePart = email.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name: formattedName,
          email,
          phone: '+91 90000 12345',
          joinedDate: new Date().toISOString().split('T')[0],
          addresses: ['123 Main St, New Delhi'],
          activityLogs: [{ date: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'Account created' }]
        };
        const updatedCusts = [...get().customers, newCust];
        set({ customers: updatedCusts });
        setLocal('customers', updatedCusts);
        userFound = true;
        loggedInUser = { id: newCust.id, name: newCust.name, email, role: 'Customer' as const, details: newCust };
      }
    }

    if (userFound && loggedInUser) {
      set({ currentUser: loggedInUser });
      setLocal('currentUser', loggedInUser);
      // Log customer active signin
      if (role === 'Customer') {
        get().logCustomerActivity(loggedInUser.id, 'Logged in to portal');
      }
      return true;
    }
    return false;
  },

  logout: () => {
    const user = get().currentUser;
    if (user && user.role === 'Customer') {
      get().logCustomerActivity(user.id, 'Logged out of portal');
    }
    set({ currentUser: null, cart: [] });
    setLocal('currentUser', null);
    setLocal('cart', []);
  },

  registerCustomer: (name, email, phone, address) => {
    const exists = get().customers.some(c => c.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      joinedDate: new Date().toISOString().split('T')[0],
      addresses: [address],
      activityLogs: [{ date: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'Registered' }]
    };

    const updated = [...get().customers, newCust];
    set({ customers: updated });
    setLocal('customers', updated);
    return true;
  },

  // Cart Operations
  addToCart: (product, quantity = 1) => {
    const cart = get().cart;
    const existing = cart.find(item => item.product.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newCart = [...cart, { product, quantity }];
    }
    set({ cart: newCart });
    setLocal('cart', newCart);
  },

  removeFromCart: (productId) => {
    const newCart = get().cart.filter(item => item.product.id !== productId);
    set({ cart: newCart });
    setLocal('cart', newCart);
  },

  updateCartQty: (productId, qty) => {
    const newCart = get().cart.map(item =>
      item.product.id === productId ? { ...item, quantity: Math.max(1, qty) } : item
    );
    set({ cart: newCart });
    setLocal('cart', newCart);
  },

  clearCart: () => {
    set({ cart: [] });
    setLocal('cart', []);
  },

  toggleWishlist: (product) => {
    const wishlist = get().wishlist;
    const exists = wishlist.some(item => item.id === product.id);
    let newWish;
    if (exists) {
      newWish = wishlist.filter(item => item.id !== product.id);
    } else {
      newWish = [...wishlist, product];
    }
    set({ wishlist: newWish });
    setLocal('wishlist', newWish);
  },

  // Customer Management
  addCustomer: (cust) => {
    const newCust: Customer = {
      ...cust,
      id: `cust-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      activityLogs: [{ date: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'Customer profile created by Admin' }]
    };
    const updated = [...get().customers, newCust];
    set({ customers: updated });
    setLocal('customers', updated);
  },

  editCustomer: (id, updates) => {
    const updated = get().customers.map(c => {
      if (c.id === id) {
        const logs = [...c.activityLogs, { date: new Date().toISOString().replace('T', ' ').substring(0, 16), action: 'Profile details updated' }];
        return { ...c, ...updates, activityLogs: logs };
      }
      return c;
    });
    set({ customers: updated });
    setLocal('customers', updated);

    // Sync auth session if current customer updated
    const cur = get().currentUser;
    if (cur && cur.id === id) {
      const updatedUser = updated.find(c => c.id === id);
      set({ currentUser: { ...cur, name: updatedUser?.name || cur.name, details: updatedUser } });
    }
  },

  deleteCustomer: (id) => {
    const updated = get().customers.filter(c => c.id !== id);
    set({ customers: updated });
    setLocal('customers', updated);
  },

  logCustomerActivity: (customerId, action) => {
    const updated = get().customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          activityLogs: [...c.activityLogs, { date: new Date().toISOString().replace('T', ' ').substring(0, 16), action }]
        };
      }
      return c;
    });
    set({ customers: updated });
    setLocal('customers', updated);
  },

  // Employee Management
  addEmployee: (emp) => {
    const newEmp: Employee = {
      ...emp,
      id: `emp-${Date.now()}`,
      avatar: emp.avatar || `https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=60`,
      attendance: {
        status: 'Clocked Out',
        history: []
      },
      leaves: [],
      salary: {
        base: emp.baseSalary,
        bonus: 0,
        deductions: 0,
        history: []
      },
      assignedTasks: []
    };
    const updated = [...get().employees, newEmp];
    set({ employees: updated });
    setLocal('employees', updated);
  },

  editEmployee: (id, updates) => {
    const updated = get().employees.map(e => (e.id === id ? { ...e, ...updates } : e));
    set({ employees: updated });
    setLocal('employees', updated);

    // Sync auth session if current employee updated
    const cur = get().currentUser;
    if (cur && cur.id === id) {
      const updatedEmp = updated.find(e => e.id === id);
      set({ currentUser: { ...cur, name: updatedEmp?.name || cur.name, details: updatedEmp } });
    }
  },

  deleteEmployee: (id) => {
    const updated = get().employees.filter(e => e.id !== id);
    set({ employees: updated });
    setLocal('employees', updated);
  },

  // Attendance & Leaves
  clockIn: (employeeId) => {
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        const historyExists = e.attendance.history.some(h => h.date === today);
        let nextHistory = [...e.attendance.history];

        if (!historyExists) {
          nextHistory.push({ date: today, status: 'Present', clockIn: time });
        }

        return {
          ...e,
          attendance: {
            status: 'Present' as const,
            clockIn: time,
            history: nextHistory
          }
        };
      }
      return e;
    });

    set({ employees: updated });
    setLocal('employees', updated);

    // Sync active session
    const cur = get().currentUser;
    if (cur && cur.id === employeeId) {
      set({ currentUser: { ...cur, details: updated.find(e => e.id === employeeId) } });
    }
  },

  clockOut: (employeeId) => {
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        const nextHistory = e.attendance.history.map(h => {
          if (h.date === today) {
            return { ...h, clockOut: time };
          }
          return h;
        });

        return {
          ...e,
          attendance: {
            status: 'Clocked Out' as const,
            clockIn: undefined,
            clockOut: time,
            history: nextHistory
          }
        };
      }
      return e;
    });

    set({ employees: updated });
    setLocal('employees', updated);

    // Sync active session
    const cur = get().currentUser;
    if (cur && cur.id === employeeId) {
      set({ currentUser: { ...cur, details: updated.find(e => e.id === employeeId) } });
    }
  },

  requestLeave: (employeeId, leave) => {
    const newLeave: LeaveRequest = {
      id: `leave-${Date.now()}`,
      ...leave,
      status: 'Pending'
    };

    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        return {
          ...e,
          leaves: [...e.leaves, newLeave]
        };
      }
      return e;
    });

    set({ employees: updated });
    setLocal('employees', updated);

    // Sync active session
    const cur = get().currentUser;
    if (cur && cur.id === employeeId) {
      set({ currentUser: { ...cur, details: updated.find(e => e.id === employeeId) } });
    }
  },

  updateLeaveStatus: (employeeId, leaveId, status) => {
    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        const nextLeaves = e.leaves.map(l => (l.id === leaveId ? { ...l, status } : l));
        
        // Add present/on-leave history if approved
        let nextHistory = [...e.attendance.history];
        if (status === 'Approved') {
          const lReq = e.leaves.find(l => l.id === leaveId);
          if (lReq) {
            // Push a record in attendance history
            nextHistory.push({
              date: lReq.startDate,
              status: 'On Leave'
            });
          }
        }

        return {
          ...e,
          leaves: nextLeaves,
          attendance: {
            ...e.attendance,
            history: nextHistory,
            status: status === 'Approved' ? ('On Leave' as const) : e.attendance.status
          }
        };
      }
      return e;
    });

    set({ employees: updated });
    setLocal('employees', updated);

    // Sync active session if the admin changes own/active employee status
    const cur = get().currentUser;
    if (cur && cur.id === employeeId) {
      set({ currentUser: { ...cur, details: updated.find(e => e.id === employeeId) } });
    }
  },

  // Task Management
  assignTask: (employeeId, taskTitle, desc, dueDate) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      description: desc,
      status: 'Pending',
      dueDate
    };

    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        return {
          ...e,
          assignedTasks: [...e.assignedTasks, newTask]
        };
      }
      return e;
    });

    set({ employees: updated });
    setLocal('employees', updated);
  },

  updateTaskStatus: (employeeId, taskId, status) => {
    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        const nextTasks = e.assignedTasks.map(t => (t.id === taskId ? { ...t, status } : t));
        return { ...e, assignedTasks: nextTasks };
      }
      return e;
    });

    set({ employees: updated });
    setLocal('employees', updated);

    // Sync active session
    const cur = get().currentUser;
    if (cur && cur.id === employeeId) {
      set({ currentUser: { ...cur, details: updated.find(e => e.id === employeeId) } });
    }
  },

  // Payroll Management
  addPayslip: (employeeId, payslip) => {
    const newPayslip: Payslip = {
      id: `pay-${Date.now()}`,
      ...payslip,
      generatedDate: new Date().toISOString().split('T')[0]
    };

    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        return {
          ...e,
          salary: {
            ...e.salary,
            history: [newPayslip, ...e.salary.history]
          }
        };
      }
      return e;
    });

    set({ employees: updated });
    setLocal('employees', updated);
  },

  updateSalaryStructure: (employeeId, base, bonus, deductions) => {
    const updated = get().employees.map(e => {
      if (e.id === employeeId) {
        return {
          ...e,
          salary: {
            ...e.salary,
            base,
            bonus,
            deductions
          }
        };
      }
      return e;
    });
    set({ employees: updated });
    setLocal('employees', updated);
  },

  // Inventory Management
  addProduct: (product) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`
    };
    const updated = [...get().products, newProduct];
    set({ products: updated });
    setLocal('products', updated);
  },

  editProduct: (id, updates) => {
    const updated = get().products.map(p => (p.id === id ? { ...p, ...updates } : p));
    set({ products: updated });
    setLocal('products', updated);
  },

  deleteProduct: (id) => {
    const updated = get().products.filter(p => p.id !== id);
    set({ products: updated });
    setLocal('products', updated);
  },

  // Order Management
  placeOrder: (shippingAddress, paymentMethod) => {
    const user = get().currentUser;
    const cart = get().cart;
    if (!user || cart.length === 0) return { success: false };

    // Update product stock counts
    let stockError = false;
    const updatedProducts = get().products.map(p => {
      const cartItem = cart.find(c => c.product.id === p.id);
      if (cartItem) {
        if (p.stock < cartItem.quantity) {
          stockError = true;
        }
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    });

    if (stockError) {
      return { success: false };
    }

    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      image: item.product.image
    }));

    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      items: orderItems,
      totalAmount: total,
      status: 'Pending',
      shippingAddress,
      paymentMethod,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedOrders = [newOrder, ...get().orders];
    
    // Save state
    set({
      orders: updatedOrders,
      products: updatedProducts,
      cart: []
    });
    setLocal('orders', updatedOrders);
    setLocal('products', updatedProducts);
    setLocal('cart', []);

    // Log customer activity
    get().logCustomerActivity(user.id, `Placed Order #${orderId} for ₹${total}`);

    return { success: true, orderId };
  },

  updateOrderStatus: (orderId, status) => {
    const updated = get().orders.map(o => {
      if (o.id === orderId) {
        // Log activity for the customer
        get().logCustomerActivity(o.customerId, `Order #${orderId} status updated to ${status}`);
        return { ...o, status };
      }
      return o;
    });
    set({ orders: updated });
    setLocal('orders', updated);
  },

  assignOrderEmployee: (orderId, employeeId) => {
    const emp = get().employees.find(e => e.id === employeeId);
    const updated = get().orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          assignedEmployeeId: employeeId,
          assignedEmployeeName: emp ? emp.name : undefined
        };
      }
      return o;
    });
    set({ orders: updated });
    setLocal('orders', updated);

    // Add task to employee automatically
    if (emp) {
      get().assignTask(employeeId, `Deliver Order #${orderId}`, `Please dispatch order #${orderId} to ${updated.find(o => o.id === orderId)?.shippingAddress}`, new Date().toISOString().split('T')[0]);
    }
  },

  // Tempo Booking
  bookTempo: (bookingData) => {
    const user = get().currentUser;
    if (!user) return;

    const bkgId = `BKG-${Math.floor(2000 + Math.random() * 9000)}`;
    const newBooking: TempoBooking = {
      id: bkgId,
      customerId: user.id,
      customerName: user.name,
      customerPhone: (user.details as Customer)?.phone || '+91 99999 88888',
      ...bookingData,
      status: 'Pending'
    };

    const updated = [newBooking, ...get().bookings];
    set({ bookings: updated });
    setLocal('bookings', updated);

    get().logCustomerActivity(user.id, `Booked Tempo Service #${bkgId}`);
  },

  assignBookingDriver: (bookingId, driverId) => {
    const driver = get().employees.find(e => e.id === driverId);
    const updated = get().bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          assignedDriverId: driverId,
          assignedDriverName: driver ? driver.name : undefined,
          status: 'Assigned' as const
        };
      }
      return b;
    });

    set({ bookings: updated });
    setLocal('bookings', updated);

    // Auto assign driver task
    if (driver) {
      get().assignTask(driverId, `Tempo Trip #${bookingId}`, `Pickup cargo from ${updated.find(b => b.id === bookingId)?.pickupAddress} and drop at ${updated.find(b => b.id === bookingId)?.dropAddress}`, updated.find(b => b.id === bookingId)?.date || '');
    }
  },

  updateBookingStatus: (bookingId, status) => {
    const updated = get().bookings.map(b => {
      if (b.id === bookingId) {
        get().logCustomerActivity(b.customerId, `Tempo Booking #${bookingId} status updated to ${status}`);
        return { ...b, status };
      }
      return b;
    });
    set({ bookings: updated });
    setLocal('bookings', updated);
  },

  // Interior Design Projects
  addProject: (proj) => {
    const newProj: PortfolioProject = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    const updated = [...get().projects, newProj];
    set({ projects: updated });
    setLocal('projects', updated);
  },

  editProject: (id, updates) => {
    const updated = get().projects.map(p => (p.id === id ? { ...p, ...updates } : p));
    set({ projects: updated });
    setLocal('projects', updated);
  },

  deleteProject: (id) => {
    const updated = get().projects.filter(p => p.id !== id);
    set({ projects: updated });
    setLocal('projects', updated);
  },

  // Enquiries
  submitEnquiry: (enq) => {
    const newEnq: Enquiry = {
      ...enq,
      id: `ENQ-${Math.floor(3000 + Math.random() * 9000)}`,
      status: 'Pending',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    const updated = [newEnq, ...get().enquiries];
    set({ enquiries: updated });
    setLocal('enquiries', updated);
  },

  replyEnquiry: (id, replyText) => {
    const updated = get().enquiries.map(eq => (eq.id === id ? { ...eq, replyText, status: 'Resolved' as const } : eq));
    set({ enquiries: updated });
    setLocal('enquiries', updated);
  },

  // CMS Content
  updateCMS: (updates) => {
    const nextCMS = { ...get().cms, ...updates };
    set({ cms: nextCMS });
    setLocal('cms', nextCMS);
  }
}));
