// ─────────────────────────────────────────────────
// Centralized translations for SariSmart
// Supports: English, Filipino (Tagalog), Bisaya (Cebuano)
// ─────────────────────────────────────────────────

const translations = {

  // ══════════════════════════════════════════════
  //  ENGLISH
  // ══════════════════════════════════════════════
  English: {

    // ── Bottom Navigation ──
    navHome: "Home",
    navInventory: "Inventory",
    navInsights: "Insights",
    navProfile: "Profile",

    // ── Greetings (Homepage & GreetingCard) ──
    greetingMorning: "Good morning! 👋",
    greetingAfternoon: "Good afternoon! 👋",
    greetingEvening: "Good evening! 👋",

    // ── Homepage ──
    todaysSales: "Today's Sales",
    profit: "Profit",
    transactions: "Transactions",
    needRestock: "Need Restock",
    asOfToday: "as of today",
    completed: "completed",
    itemsLow: "items low",
    aiTip: "AI TIP",
    aiTipText: "Sales might peak this weekend. Ensure best-sellers are stocked.",
    products: "Products",
    viewAndRestockSoon: "View and Restock Soon",
    recentActivity: "Recent Activity",
    latest: "Latest",
    noRecentActivity: "No recent activity.",

    // ── Inventory Page ──
    inventory: "INVENTORY",
    searchProducts: "Search Products...",
    addProduct: "Add Product",
    allProducts: "All Products",
    allItemsWellStocked: "All items well stocked!",
    noProductsFound: "No products found.",
    loadingInventory: "Loading inventory products...",
    loadingRestockItems: "Loading restock items...",

    // ── Add Product Page ──
    addPhoto: "Add Photo",
    changePhoto: "Change Photo",
    productName: "Product Name",
    enterProductName: "Enter product name",
    category: "Category",
    selectCategory: "Select category",
    sellingPrice: "Selling Price",
    costPrice: "Cost Price",
    optional: "(Optional)",
    initialStock: "Initial Stock",
    lowStockAlert: "Low Stock Alert",
    whenStockIs: "When stock is",
    orLess: "or less",
    saveProduct: "Save Product",
    saving: "Saving...",
    productSaved: "Product Saved!",
    productAddedSuccess: "✓ Product added successfully!",
    productNameRequired: "Product name is required.",
    selectCategoryError: "Please select a category.",
    validSellingPrice: "Enter a valid selling price.",

    // ── Add Transaction Page ──
    addTransaction: "Add Transaction",
    customerItems: "Customer Items",
    clear: "Clear",
    addNote: "+Add Note",
    addANote: "Add a note...",
    totalItems: "Total Items",
    subtotal: "Subtotal",
    amountGiven: "Amount Given",
    change: "Change",
    completeTransaction: "Complete Transaction",
    completing: "Completing...",
    transactionSaved: "Transaction Saved!",
    transactionRecorded: "The transaction was successfully recorded.",
    totalBillAmount: "Total Bill Amount",
    cashReceived: "Cash Received",
    changeToGive: "Change to Give",
    backToDashboard: "Back to Dashboard",
    viewTodaysTransaction: "View Today's Transaction",
    notEnoughStock: "Not enough stock in inventory!",
    pleaseAddItems: "Please add items to the cart.",
    amountGivenRequired: "Amount given is required!",
    amountMustBeAtLeast: "Amount given must be at least the subtotal!",
    failedToSave: "Failed to save transaction.",
    errorSaving: "Error saving transaction.",

    // ── Transactions Page ──
    transactionsTitle: "Transactions",
    today: "Today",
    loadingTransactions: "Loading transactions...",
    noTransactionsToday: "No transactions today.",
    itemizedItems: "Itemized Items",

    // ── Insights Page ──
    insights: "Insights",
    tabToday: "TODAY",
    tabWeek: "WEEK",
    tabMonth: "MONTH",
    totalRevenueGenerated: "Total Revenue Generated",
    calculatedNetProfit: "Calculated Store Net Profit",
    productPerformance: "Product Performance",
    viewRankedList: "View Ranked List",
    noDataAvailable: "No data available.",

    // ── Adjust Stock Modal ──
    productStock: "Product stock",
    addStock: "Add Stock",
    subtractStock: "Subtract Stock",
    currentStock: "Current Stock",
    quantityToAdd: "Quantity to Add",
    quantityToSubtract: "Quantity to Subtract",
    newStockWillBe: "New stock will be",
    supplier: "Supplier (Optional)",
    selectSupplier: "Select supplier",
    totalCost: "Total Cost (Optional)",
    notes: "Notes (Optional)",
    enterNotes: "Enter notes",
    save: "Save",
    savingDots: "Saving...",

    // ── Profile Page ──
    editProfile: "Edit Profile",
    storeInfo: "Store Information",
    storeName: "Store Name",
    businessAddress: "Business Address",
    openingHours: "Opening Hours",
    preferences: "Preferences",
    darkMode: "Dark Mode",
    language: "Language",
    notifications: "Notifications",
    aiPreferences: "AI Preferences",
    aiSuggestions: "AI Suggestions",
    restockAlerts: "Restock Alerts",
    markupSuggestions: "Markup Suggestions",
    exportData: "Export Data",
    salesReport: "Sales Report",
    inventoryExport: "Inventory Export",
    support: "Support",
    helpCenter: "Help Center",
    about: "About SariSmart",
    logout: "Logout",
    selectLanguage: "Select Language",
    ownerName: "Owner Name",
  },

  // ══════════════════════════════════════════════
  //  FILIPINO (Tagalog)
  // ══════════════════════════════════════════════
  Filipino: {

    // ── Bottom Navigation ──
    navHome: "Bahay",
    navInventory: "Imbentaryo",
    navInsights: "Pananaw",
    navProfile: "Profile",

    // ── Greetings ──
    greetingMorning: "Magandang Umaga! 👋",
    greetingAfternoon: "Magandang Hapon! 👋",
    greetingEvening: "Magandang Gabi! 👋",

    // ── Homepage ──
    todaysSales: "Benta Ngayon",
    profit: "Kita",
    transactions: "Transaksyon",
    needRestock: "Kailangan ng Restock",
    asOfToday: "ngayong araw",
    completed: "nakumpleto",
    itemsLow: "mababang stock",
    aiTip: "AI TIP",
    aiTipText: "Maaaring tumaas ang benta ngayong weekend. Siguraduhing may sapat na stock.",
    products: "Produkto",
    viewAndRestockSoon: "Tingnan at I-restock Agad",
    recentActivity: "Kamakailang Aktibidad",
    latest: "Pinakabago",
    noRecentActivity: "Walang kamakailang aktibidad.",

    // ── Inventory Page ──
    inventory: "IMBENTARYO",
    searchProducts: "Maghanap ng Produkto...",
    addProduct: "Magdagdag ng Produkto",
    allProducts: "Lahat ng Produkto",
    allItemsWellStocked: "Lahat ng item ay may sapat na stock!",
    noProductsFound: "Walang nakitang produkto.",
    loadingInventory: "Nilo-load ang mga produkto...",
    loadingRestockItems: "Nilo-load ang mga restock item...",

    // ── Add Product Page ──
    addPhoto: "Magdagdag ng Larawan",
    changePhoto: "Palitan ang Larawan",
    productName: "Pangalan ng Produkto",
    enterProductName: "Ilagay ang pangalan ng produkto",
    category: "Kategorya",
    selectCategory: "Pumili ng kategorya",
    sellingPrice: "Presyo ng Benta",
    costPrice: "Presyo ng Gastos",
    optional: "(Opsyonal)",
    initialStock: "Paunang Stock",
    lowStockAlert: "Alerto sa Mababang Stock",
    whenStockIs: "Kapag ang stock ay",
    orLess: "o mas mababa",
    saveProduct: "I-save ang Produkto",
    saving: "Sinasave...",
    productSaved: "Na-save na ang Produkto!",
    productAddedSuccess: "✓ Matagumpay na naidagdag ang produkto!",
    productNameRequired: "Kinakailangan ang pangalan ng produkto.",
    selectCategoryError: "Pumili ng kategorya.",
    validSellingPrice: "Maglagay ng tamang presyo ng benta.",

    // ── Add Transaction Page ──
    addTransaction: "Magdagdag ng Transaksyon",
    customerItems: "Mga Item ng Customer",
    clear: "I-clear",
    addNote: "+Magdagdag ng Tala",
    addANote: "Magdagdag ng tala...",
    totalItems: "Kabuuang Item",
    subtotal: "Subtotal",
    amountGiven: "Halagang Ibinigay",
    change: "Sukli",
    completeTransaction: "Kumpletuhin ang Transaksyon",
    completing: "Kinukumpleto...",
    transactionSaved: "Na-save ang Transaksyon!",
    transactionRecorded: "Matagumpay na naitala ang transaksyon.",
    totalBillAmount: "Kabuuang Halaga ng Bill",
    cashReceived: "Cash na Natanggap",
    changeToGive: "Sukli",
    backToDashboard: "Bumalik sa Dashboard",
    viewTodaysTransaction: "Tingnan ang Transaksyon Ngayon",
    notEnoughStock: "Hindi sapat ang stock sa imbentaryo!",
    pleaseAddItems: "Magdagdag ng item sa cart.",
    amountGivenRequired: "Kinakailangan ang halagang ibinigay!",
    amountMustBeAtLeast: "Ang halaga ay dapat hindi bababa sa subtotal!",
    failedToSave: "Hindi na-save ang transaksyon.",
    errorSaving: "May error sa pag-save ng transaksyon.",

    // ── Transactions Page ──
    transactionsTitle: "Mga Transaksyon",
    today: "Ngayon",
    loadingTransactions: "Nilo-load ang mga transaksyon...",
    noTransactionsToday: "Walang transaksyon ngayon.",
    itemizedItems: "Mga Item",

    // ── Insights Page ──
    insights: "Mga Pananaw",
    tabToday: "NGAYON",
    tabWeek: "LINGGO",
    tabMonth: "BUWAN",
    totalRevenueGenerated: "Kabuuang Kita na Na-generate",
    calculatedNetProfit: "Kinalkula na Net na Kita ng Tindahan",
    productPerformance: "Performance ng Produkto",
    viewRankedList: "Tingnan ang Ranked List",
    noDataAvailable: "Walang data na available.",

    // ── Adjust Stock Modal ──
    productStock: "Stock ng produkto",
    addStock: "Dagdagan ang Stock",
    subtractStock: "Bawasan ang Stock",
    currentStock: "Kasalukuyang Stock",
    quantityToAdd: "Dami na Idadagdag",
    quantityToSubtract: "Dami na Ibabawas",
    newStockWillBe: "Ang bagong stock ay magiging",
    supplier: "Supplier (Opsyonal)",
    selectSupplier: "Pumili ng supplier",
    totalCost: "Kabuuang Gastos (Opsyonal)",
    notes: "Mga Tala (Opsyonal)",
    enterNotes: "Maglagay ng tala",
    save: "I-save",
    savingDots: "Sinasave...",

    // ── Profile Page ──
    editProfile: "I-edit ang Profile",
    storeInfo: "Impormasyon ng Tindahan",
    storeName: "Pangalan ng Tindahan",
    businessAddress: "Address ng Negosyo",
    openingHours: "Oras ng Bukas",
    preferences: "Mga Kagustuhan",
    darkMode: "Madilim na Mode",
    language: "Wika",
    notifications: "Mga Abiso",
    aiPreferences: "Kagustuhan sa AI",
    aiSuggestions: "Mga Mungkahi ng AI",
    restockAlerts: "Alerto sa Restock",
    markupSuggestions: "Mungkahi sa Markup",
    exportData: "I-export ang Data",
    salesReport: "Ulat sa Benta",
    inventoryExport: "I-export ang Imbentaryo",
    support: "Suporta",
    helpCenter: "Help Center",
    about: "Tungkol sa SariSmart",
    logout: "Mag-logout",
    selectLanguage: "Pumili ng Wika",
    ownerName: "Pangalan ng May-ari",
  },

  // ══════════════════════════════════════════════
  //  BISAYA (Cebuano)
  // ══════════════════════════════════════════════
  Bisaya: {

    // ── Bottom Navigation ──
    navHome: "Balay",
    navInventory: "Imbentaryo",
    navInsights: "Pagsabot",
    navProfile: "Profile",

    // ── Greetings ──
    greetingMorning: "Maayong Buntag! 👋",
    greetingAfternoon: "Maayong Hapon! 👋",
    greetingEvening: "Maayong Gabii! 👋",

    // ── Homepage ──
    todaysSales: "Halin Karon",
    profit: "Ganansya",
    transactions: "Transaksyon",
    needRestock: "Kinahanglan og Restock",
    asOfToday: "karon nga adlaw",
    completed: "nahuman",
    itemsLow: "ubos na ang stock",
    aiTip: "AI TIP",
    aiTipText: "Posible nga motaas ang halin karong weekend. Siguradoha nga naa pay stock.",
    products: "Produkto",
    viewAndRestockSoon: "Tan-awa ug I-restock Dayon",
    recentActivity: "Bag-ong Aktibidad",
    latest: "Pinakabag-o",
    noRecentActivity: "Walay bag-ong aktibidad.",

    // ── Inventory Page ──
    inventory: "IMBENTARYO",
    searchProducts: "Pangitaa ang Produkto...",
    addProduct: "Dugang og Produkto",
    allProducts: "Tanang Produkto",
    allItemsWellStocked: "Tanang item naa pay stock!",
    noProductsFound: "Walay nakita nga produkto.",
    loadingInventory: "Gi-load ang mga produkto...",
    loadingRestockItems: "Gi-load ang mga restock item...",

    // ── Add Product Page ──
    addPhoto: "Dugang og Litrato",
    changePhoto: "Ilisan ang Litrato",
    productName: "Ngalan sa Produkto",
    enterProductName: "Isulat ang ngalan sa produkto",
    category: "Kategorya",
    selectCategory: "Pilia ang kategorya",
    sellingPrice: "Presyo sa Pagbaligya",
    costPrice: "Presyo sa Gastos",
    optional: "(Opsyonal)",
    initialStock: "Unang Stock",
    lowStockAlert: "Alerto sa Ubos nga Stock",
    whenStockIs: "Kung ang stock kay",
    orLess: "o mas ubos",
    saveProduct: "I-save ang Produkto",
    saving: "Gi-save...",
    productSaved: "Na-save na ang Produkto!",
    productAddedSuccess: "✓ Malampuson nga nadugang ang produkto!",
    productNameRequired: "Kinahanglan ang ngalan sa produkto.",
    selectCategoryError: "Pilia ang kategorya.",
    validSellingPrice: "Isulat ang husto nga presyo sa pagbaligya.",

    // ── Add Transaction Page ──
    addTransaction: "Dugang og Transaksyon",
    customerItems: "Mga Item sa Customer",
    clear: "I-clear",
    addNote: "+Dugang og Nota",
    addANote: "Dugang og nota...",
    totalItems: "Total nga Item",
    subtotal: "Subtotal",
    amountGiven: "Kantidad nga Gihatag",
    change: "Sukli",
    completeTransaction: "Kumpletoha ang Transaksyon",
    completing: "Gikumpleto...",
    transactionSaved: "Na-save ang Transaksyon!",
    transactionRecorded: "Malampuson nga natala ang transaksyon.",
    totalBillAmount: "Total nga Kantidad sa Bill",
    cashReceived: "Cash nga Nadawat",
    changeToGive: "Sukli",
    backToDashboard: "Balik sa Dashboard",
    viewTodaysTransaction: "Tan-awa ang Transaksyon Karon",
    notEnoughStock: "Kulang ang stock sa imbentaryo!",
    pleaseAddItems: "Pagdugang og item sa cart.",
    amountGivenRequired: "Kinahanglan ang kantidad nga gihatag!",
    amountMustBeAtLeast: "Ang kantidad kinahanglan dili moubos sa subtotal!",
    failedToSave: "Wala ma-save ang transaksyon.",
    errorSaving: "Naay error sa pag-save sa transaksyon.",

    // ── Transactions Page ──
    transactionsTitle: "Mga Transaksyon",
    today: "Karon",
    loadingTransactions: "Gi-load ang mga transaksyon...",
    noTransactionsToday: "Walay transaksyon karon.",
    itemizedItems: "Mga Item",

    // ── Insights Page ──
    insights: "Mga Pagsabot",
    tabToday: "KARON",
    tabWeek: "SEMANA",
    tabMonth: "BULAN",
    totalRevenueGenerated: "Total nga Halin nga Na-generate",
    calculatedNetProfit: "Gikalkula nga Net nga Ganansya sa Tindahan",
    productPerformance: "Performance sa Produkto",
    viewRankedList: "Tan-awa ang Ranked List",
    noDataAvailable: "Walay data nga available.",

    // ── Adjust Stock Modal ──
    productStock: "Stock sa produkto",
    addStock: "Dugangan ang Stock",
    subtractStock: "Kuha-an ang Stock",
    currentStock: "Karon nga Stock",
    quantityToAdd: "Gidaghanon nga Idugang",
    quantityToSubtract: "Gidaghanon nga Kuha-on",
    newStockWillBe: "Ang bag-ong stock mahimong",
    supplier: "Supplier (Opsyonal)",
    selectSupplier: "Pilia ang supplier",
    totalCost: "Total nga Gastos (Opsyonal)",
    notes: "Mga Nota (Opsyonal)",
    enterNotes: "Isulat ang nota",
    save: "I-save",
    savingDots: "Gi-save...",

    // ── Profile Page ──
    editProfile: "I-edit ang Profile",
    storeInfo: "Impormasyon sa Tindahan",
    storeName: "Ngalan sa Tindahan",
    businessAddress: "Address sa Negosyo",
    openingHours: "Oras sa Pag-abli",
    preferences: "Mga Gusto",
    darkMode: "Ngitngit nga Mode",
    language: "Pinulongan",
    notifications: "Mga Notipikasyon",
    aiPreferences: "Gusto sa AI",
    aiSuggestions: "Suhisyon sa AI",
    restockAlerts: "Pahibalo sa Restock",
    markupSuggestions: "Suhisyon sa Presyo",
    exportData: "I-export ang Data",
    salesReport: "Report sa Halin",
    inventoryExport: "I-export ang Imbentaryo",
    support: "Suporta",
    helpCenter: "Help Center",
    about: "Bahin sa SariSmart",
    logout: "Mag-logout",
    selectLanguage: "Pagpili og Pinulongan",
    ownerName: "Ngalan sa Tag-iya",
  },
};

/**
 * Returns the translation object for the given language.
 * Falls back to English if the language is not found.
 * @param {string} [lang] - Language key. Defaults to localStorage value or "English".
 * @returns {object} Translation object with all UI string keys.
 */
export function getTranslation(lang) {
  const language = lang || localStorage.getItem("language") || "English";
  return translations[language] || translations["English"];
}

export default translations;
