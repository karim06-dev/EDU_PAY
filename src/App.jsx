import { useState, useEffect, useContext, createContext, useCallback, useReducer } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// LANGUAGE SYSTEM — English & Swahili
// ══════════════════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    // Navigation
    overview:"Overview", students:"Students", invoices:"Invoices", ledger:"Ledger",
    reconciliation:"Reconciliation", reports:"Reports", audit:"Audit",
    transactions:"Transactions", support:"Support",
    // Auth
    selectRole:"Who are you?", selectRoleDesc:"Select your role to continue",
    schoolAdmin:"School Admin", bankOfficer:"Bank Officer", parentGuardian:"Parent / Guardian",
    schoolAdminDesc:"Bursars & School Directors", bankOfficerDesc:"CRDB / NMB Payment Staff",
    parentDesc:"Pay school fees online", signIn:"Sign In", signInAs:"Sign in as",
    email:"Email", password:"Password", emailPlaceholder:"your@email.com",
    passwordPlaceholder:"Enter password", verifying:"Verifying…",
    quickDemo:"⚡ Quick Demo Login", clickToLogin:"Click to login →",
    invalidCreds:"Invalid credentials.", fillFields:"Fill in all fields.",
    selectRoleFirst:"Please select your role.",
    // Dashboard
    welcomeBack:"Welcome back", educationDiv:"Education Payments Division",
    academicYear:"2025/2026 Academic Year · Term 1 · Dar es Salaam",
    // Stats
    totalStudents:"Total Students", enrolled:"Enrolled",
    totalFees:"Total Fees (TZS)", expectedTerm:"Expected this term",
    collected:"Collected (TZS)", outstanding:"Outstanding (TZS)", balanceDue:"Balance due",
    thisMonth:"This month", processed:"Processed", awaitingApproval:"Awaiting approval",
    schoolsConnected:"Schools Connected", onPilot:"3 on pilot",
    // Students
    studentFeeRecords:"Student Fee Records", searchStudent:"Search name or ID…",
    remind:"📱 Remind", grade:"Grade", fees:"Fees (TZS)", paid:"Paid (TZS)",
    balance:"Balance", status:"Status", action:"Action",
    // Invoices
    bulkInvoiceGen:"Bulk Invoice Generator",
    bulkInvoiceDesc:"bulkInvoiceDesc",
    bulkSmsReminders:"📱 Bulk SMS Reminders",
    bulkSmsDesc:"bulkSmsDesc",
    singleInvoice:"singleInvoice", generateInvoice:"generateInvoice",
    generateAll:"⚡ Generate", allStudents:"Invoices — All Students",
    sendReminders:"📱 Send Reminders to", parents:"Parents",
    term:"term", year:"year", dueDate:"dueDate", studentNo:"studentNo",
    feeAmount:"feeAmount", preview:"preview",
    smsPreview:"smsPreview", invoiceCreated:"Invoice created successfully",
    invoiceGenerated:"invoices generated! SMS notifications sent to all parents.",
    smsRemindersCount:"SMS reminders sent to parents",
    reminderSent:"SMS reminder sent to parent",
    unpaid:"Unpaid", partial:"Partial",
    // Ledger
    chartOfAccounts:"chartOfAccounts", doubleEntryLedger:"doubleEntryLedger",
    totalDebits:"totalDebits", totalCredits:"totalCredits", balanceCheck:"balanceCheck",
    balanced:"✅ BALANCED", mismatch:"⚠️ MISMATCH", entryNo:"Entry No",
    accountCode:"Account Code", accountName:"Account Name", type:"Type",
    amount:"Amount (TZS)", description:"Description", recordedAt:"Recorded At",
    // Reconciliation
    paymentLifecycle:"⚡ Payment Lifecycle Flow", reconciliationStatus:"Student Reconciliation Status",
    matched:"Matched", pending:"Pending", failed:"Failed", unmatched:"Unmatched",
    expected:"Expected (TZS)", received:"Received (TZS)", difference:"Difference",
    // Reports
    collectionReport:"School Collection Report", studentReport:"Student Fee Report",
    ledgerReport:"Ledger Report", platformReport:"Platform Report",
    byPaymentMethod:"By Payment Method", collectionRate:"Collection Rate",
    // Bank
    transactionLog:"transactionLog", exportCSV:"exportCSV", exportPDF:"exportPDF",
    refNo:"Ref", student:"Student", method:"Method", phone:"Phone", date:"Date",
    riskScore:"Risk Score", flags:"Flags", approve:"Approve", receipt:"Receipt",
    blocked:"Blocked", noFlags:"None",
    // Parent
    findChild:"findChild", findChildDesc:"findChildDesc",
    studentId:"studentId", findStudent:"findStudent", selectPaymentMethod:"selectPaymentMethod",
    mobileMoneyTitle:"mobileMoneyTitle", bankAppsTitle:"bankAppsTitle",
    phoneNumber:"phoneNumber", continueBtn:"continueBtn",
    confirmPayment:"confirmPayment", payVia:"Confirm Payment via",
    processing:"Processing…", pushNotification:"You will receive a push notification to approve.",
    bankInstruction:"Complete the transfer in your app using the reference above.",
    paymentSuccess:"Payment Successful!", smsReceiptSent:"SMS receipt sent to your phone. School has been notified.",
    bankTransferRecorded:"Bank transfer recorded. School will be notified upon confirmation.",
    makeAnother:"makeAnother", officialReceipt:"officialReceipt",
    computerGenerated:"computerGenerated",
    receiptNo:"receiptNo", school:"School", amountPaid:"amountPaid",
    paymentVia:"paymentVia", eduPayRef:"eduPayRef", remaining:"remaining",
    // Audit
    totalEvents:"totalEvents", criticalEvents:"criticalEvents",
    highRisk:"highRisk", failuresBlocks:"failuresBlocks",
    immutableAudit:"immutableAudit", appendOnly:"appendOnly",
    user:"User", result:"Result", risk:"Risk", ipAddress:"IP Address",
    // Misc
    signOut:"Sign Out", encrypted:"encrypted",
    noLimit:"noLimit", howToPay:"How to pay via",
    forgotPassword:"forgotPassword",
    collectByMethod:"📱 Collections by Payment Method",
    recentTransactions:"Recent Transactions",
  },
  sw: {
    // Navigation
    overview:"Muhtasari", students:"Wanafunzi", invoices:"Ankara", ledger:"Daftari",
    reconciliation:"Ulinganisho", reports:"Ripoti", audit:"Ukaguzi",
    transactions:"Miamala", support:"Msaada",
    // Auth
    selectRole:"Wewe ni nani?", selectRoleDesc:"Chagua jukumu lako kuendelea",
    schoolAdmin:"Msimamizi wa Shule", bankOfficer:"Afisa wa Benki", parentGuardian:"Mzazi / Mlezi",
    schoolAdminDesc:"Maafisa wa Fedha & Wakurugenzi", bankOfficerDesc:"Wafanyakazi wa CRDB / NMB",
    parentDesc:"Lipa ada ya shule mtandaoni", signIn:"Ingia", signInAs:"Ingia kama",
    email:"Barua Pepe", password:"Nywila", emailPlaceholder:"barua@pepe.com",
    passwordPlaceholder:"Weka nywila", verifying:"Inathibitisha…",
    quickDemo:"⚡ Ingia Haraka (Demo)", clickToLogin:"Bonyeza kuingia →",
    invalidCreds:"Taarifa si sahihi.", fillFields:"Jaza sehemu zote.",
    selectRoleFirst:"Tafadhali chagua jukumu lako.",
    // Dashboard
    welcomeBack:"Karibu tena", educationDiv:"Kitengo cha Malipo ya Elimu",
    academicYear:"Mwaka 2025/2026 · Muhula wa 1 · Dar es Salaam",
    // Stats
    totalStudents:"Jumla ya Wanafunzi", enrolled:"Waliojisajili",
    totalFees:"Jumla ya Ada (TZS)", expectedTerm:"Inayotarajiwa muhula huu",
    collected:"Iliyokusanywa (TZS)", outstanding:"Inayodaiwa (TZS)", balanceDue:"Baki inayodaiwa",
    thisMonth:"Mwezi huu", processed:"Iliyoshughulikiwa", awaitingApproval:"Inasubiri idhini",
    schoolsConnected:"Shule Zilizounganishwa", onPilot:"3 kwenye majaribio",
    // Students
    studentFeeRecords:"Kumbukumbu za Ada za Wanafunzi", searchStudent:"Tafuta jina au nambari…",
    remind:"📱 Kumbushia", grade:"Darasa", fees:"Ada (TZS)", paid:"Imelipwa (TZS)",
    balance:"Baki", status:"Hali", action:"Kitendo",
    // Invoices
    bulkInvoiceGen:"Uzalishaji wa Ankara kwa Wingi",
    bulkInvoiceDesc:"Zalisha ankara kwa WANAFUNZI WOTE kwa kubonyeza mara moja",
    bulkSmsReminders:"📱 Ukumbusho wa SMS kwa Wingi",
    bulkSmsDesc:"Tuma ukumbusho wa malipo kwa wazazi wote ambao hawajalipa",
    singleInvoice:"Ankara Moja", generateInvoice:"Zalisha Ankara",
    generateAll:"⚡ Zalisha", allStudents:"Ankara — Wanafunzi Wote",
    sendReminders:"📱 Tuma Ukumbusho kwa", parents:"Wazazi",
    term:"Muhula", year:"Mwaka", dueDate:"Tarehe ya Mwisho", studentNo:"Nambari ya Mwanafunzi",
    feeAmount:"Kiasi cha Ada (TZS)", preview:"📋 Hakiki",
    smsPreview:"Hakiki ya SMS (Kiswahili):", invoiceCreated:"Ankara imeundwa kikamilifu",
    invoiceGenerated:"ankara zimezalishwa! Arifa za SMS zimetumwa kwa wazazi wote.",
    smsRemindersCount:"Ukumbusho wa SMS umetumwa kwa wazazi",
    reminderSent:"Ukumbusho wa SMS umetumwa kwa mzazi",
    unpaid:"Haijalipiwa", partial:"Imelipwa Sehemu",
    // Ledger
    chartOfAccounts:"📊 Mfumo wa Akaunti", doubleEntryLedger:"📒 Daftari la Kuingiza Mara Mbili",
    totalDebits:"Jumla ya Madeni", totalCredits:"Jumla ya Mikopo", balanceCheck:"Ukaguzi wa Mizani",
    balanced:"✅ IMESAWAZISHWA", mismatch:"⚠️ KUTOFAUTIANA", entryNo:"Nambari ya Ingizo",
    accountCode:"Msimbo wa Akaunti", accountName:"Jina la Akaunti", type:"Aina",
    amount:"Kiasi (TZS)", description:"Maelezo", recordedAt:"Ilirekodiwa",
    // Reconciliation
    paymentLifecycle:"⚡ Mzunguko wa Malipo", reconciliationStatus:"Hali ya Ulinganisho wa Mwanafunzi",
    matched:"Zilizolinganishwa", pending:"Zinazosubiri", failed:"Zilizoshindwa", unmatched:"Hazikuoana",
    expected:"Inayotarajiwa (TZS)", received:"Iliyopokelewa (TZS)", difference:"Tofauti",
    // Reports
    collectionReport:"Ripoti ya Ukusanyaji wa Shule", studentReport:"Ripoti ya Ada ya Mwanafunzi",
    ledgerReport:"Ripoti ya Daftari", platformReport:"Ripoti ya Jukwaa",
    byPaymentMethod:"Kwa Njia ya Malipo", collectionRate:"Kiwango cha Ukusanyaji",
    // Bank
    transactionLog:"Kumbukumbu ya Miamala", exportCSV:"Hamisha CSV", exportPDF:"Hamisha PDF",
    refNo:"Kumb", student:"Mwanafunzi", method:"Njia", phone:"Simu", date:"Tarehe",
    riskScore:"Alama ya Hatari", flags:"Alama", approve:"Idhinisha", receipt:"Risiti",
    blocked:"Imezuiliwa", noFlags:"Hakuna",
    // Parent
    findChild:"Tafuta Mtoto Wako", findChildDesc:"Weka nambari ya mwanafunzi kutoka kwenye ankara ya ada.",
    studentId:"Nambari ya Mwanafunzi", findStudent:"Tafuta Mwanafunzi →", selectPaymentMethod:"Chagua Njia ya Malipo",
    mobileMoneyTitle:"📱 Pesa za Simu", bankAppsTitle:"🏦 Programu za Benki (Bila kikomo — nzuri kwa ada kubwa)",
    phoneNumber:"Nambari ya Simu", continueBtn:"Endelea →",
    confirmPayment:"Thibitisha Malipo", payVia:"Thibitisha Malipo kupitia",
    processing:"Inashughulika…", pushNotification:"Utapokea arifa ya simu kuthibitisha.",
    bankInstruction:"Kamilisha uhamisho katika programu yako ukitumia kumbukumbu iliyo juu.",
    paymentSuccess:"Malipo Yamefanikiwa!", smsReceiptSent:"Risiti ya SMS imetumwa kwa simu yako. Shule imearifiwa.",
    bankTransferRecorded:"Uhamisho wa benki umerekodiwa. Shule itaarifiwa baada ya uthibitisho.",
    makeAnother:"Fanya Malipo Mengine", officialReceipt:"RISITI RASMI",
    computerGenerated:"Risiti iliyotengenezwa na kompyuta · edupay.co.tz",
    receiptNo:"Nambari ya Risiti", school:"Shule", amountPaid:"Kiasi Kilicholipwa",
    paymentVia:"Malipo Kupitia", eduPayRef:"Kumb ya EduPay", remaining:"Baki Baada",
    // Audit
    totalEvents:"Jumla ya Matukio", criticalEvents:"Matukio Muhimu",
    highRisk:"Hatari Kubwa", failuresBlocks:"Kushindwa/Kuzuiliwa",
    immutableAudit:"🔐 Kumbukumbu ya Ukaguzi Isiyobadilika", appendOnly:"Inaongezwa tu · Haiwezi kubadilishwa au kufutwa",
    user:"Mtumiaji", result:"Matokeo", risk:"Hatari", ipAddress:"Anwani ya IP",
    // Misc
    signOut:"Toka", encrypted:"Imesimbwa kwa biti 256 · EduPay Connect · Tanzania",
    noLimit:"Bila kikomo", howToPay:"Jinsi ya kulipa kupitia",
    forgotPassword:"Umesahau nywila? Wasiliana na msimamizi wa mfumo.",
    collectByMethod:"📱 Ukusanyaji kwa Njia ya Malipo",
    recentTransactions:"Miamala ya Hivi Karibuni",
  }
};

// Language Context
const LangContext = createContext(null);
function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = (key) => TRANSLATIONS[lang][key] || TRANSLATIONS["en"][key] || key;
  const toggleLang = () => setLang(l => l==="en" ? "sw" : "en");
  return <LangContext.Provider value={{ lang, toggleLang, t }}>{children}</LangContext.Provider>;
}
const useLang = () => useContext(LangContext);

// Language Toggle Button Component
const LangToggle = () => {
  const { lang, toggleLang } = useLang();
  return (
    <button onClick={toggleLang} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:DS.radius.full, background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", color:"#fff", cursor:"pointer", fontSize:12, fontWeight:600, transition:"all .2s" }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.22)"}
      onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.12)"}>
      <span style={{ fontSize:14 }}>{lang==="en" ? "🇹🇿" : "🇬🇧"}</span>
      <span>{lang==="en" ? "Swahili" : "English"}</span>
    </button>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM
// ══════════════════════════════════════════════════════════════════════════════
const DS = {
  font: {
    display: "'Playfair Display', Georgia, serif",
    body:    "'DM Sans', 'Helvetica Neue', sans-serif",
    mono:    "'DM Mono', 'Courier New', monospace",
  },
  color: {
    school:  { bg:"#0f2d4a", accent:"#f5a623", light:"#eef4fb", border:"#d4e4f7" },
    bank:    { bg:"#0c3526", accent:"#27c97e", light:"#edfaf4", border:"#b7e8d0" },
    parent:  { bg:"#1e1148", accent:"#a78bfa", light:"#f5f3ff", border:"#ddd6fe" },
    mpesa:   "#4caf50", tigo:"#00aaff", airtel:"#e8000d", halo:"#8b1fa8",
    crdb:    "#cc2229", nmb:"#003087",  amana:"#00704a",
    danger:  "#ef4444", warn:"#f59e0b", success:"#22c55e",
    dark:    "#080f1a",
  },
  radius: { sm:6, md:10, lg:16, xl:24, full:9999 },
  shadow: { sm:"0 1px 4px rgba(0,0,0,.07)", md:"0 4px 16px rgba(0,0,0,.1)", lg:"0 8px 32px rgba(0,0,0,.15)" },
};

// Google Fonts
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return null;
};

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 1 — AUTH CONTEXT
// ══════════════════════════════════════════════════════════════════════════════
const AuthContext = createContext(null);
const DEMO_USERS = {
  "bursar@azania.ac.tz":  { id:"u1", name:"Azania Secondary", title:"Bursar",           role:"school_admin",  avatar:"AZ", school_id:"s1" },
  "amina@crdb.co.tz":     { id:"u2", name:"Amina Rashid",     title:"Payments Officer", role:"bank_officer",  avatar:"AR" },
  "juma@gmail.com":       { id:"u3", name:"Juma Hassan",      title:"Parent",           role:"parent",        avatar:"JH", student_id:"st2" },
};
const PASSWORDS = { "bursar@azania.ac.tz":"school123", "amina@crdb.co.tz":"bank123", "juma@gmail.com":"parent123" };

function AuthProvider({ children }) {
  const [user, setUser]         = useState(null);
  const [auditLog, setAuditLog] = useState([]);

  const audit = useCallback((action, resource, result="success", riskLevel="low") => {
    setAuditLog(prev => [{
      id:`AUD-${Date.now()}`, action, resource, result, riskLevel,
      user_id: user?.id, role: user?.role, user_name: user?.name,
      ip:"197.186.x.x", timestamp: new Date().toISOString(),
    }, ...prev].slice(0, 200));
  }, [user]);

  const login = async (email, password, role) => {
    await new Promise(r => setTimeout(r, 1200));
    if (PASSWORDS[email] !== password) throw new Error("Invalid credentials");
    const found = DEMO_USERS[email];
    if (!found || found.role !== role) throw new Error("Invalid role");
    setUser(found);
    setAuditLog(prev => [{ id:`AUD-${Date.now()}`, action:"LOGIN_SUCCESS", resource:"auth", result:"success", riskLevel:"low", user_id:found.id, role:found.role, user_name:found.name, ip:"197.186.x.x", timestamp:new Date().toISOString() }, ...prev]);
    return found;
  };

  const logout = () => { audit("LOGOUT","auth"); setUser(null); };
  return <AuthContext.Provider value={{ user, login, logout, audit, auditLog }}>{children}</AuthContext.Provider>;
}
const useAuth = () => useContext(AuthContext);

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 2 — GLOBAL DATA STORE (shared across ALL portals)
// ══════════════════════════════════════════════════════════════════════════════
// This is the single source of truth. When parent pays → invoices update →
// school dashboard and bank dashboard both reflect the change instantly.
const DataContext = createContext(null);

function DataProvider({ children }) {
  const [invoices,     setInvoices]     = useState(null); // set after init data loads
  const [transactions, setTransactions] = useState(null);
  const [ledger,       setLedger]       = useState(null);

  // Initialize from init data on first load
  useEffect(() => {
    setInvoices(initInvoices);
    setTransactions(initTransactions);
    setLedger(initLedger);
  }, []);

  // ── Called when parent completes a payment ────────────────────────────────
  const processPayment = ({ invoiceId, amountTzs, method, payerPhone, txRef }) => {
    const now = new Date().toISOString();
    const date = now.split("T")[0];

    // 1. Create new transaction
    let newTxn = {
      id:          `t-${Date.now()}`,
      ref:         txRef,
      invoice_id:  invoiceId,
      student_id:  null, // filled below
      school_id:   "s1",
      amount_tzs:  amountTzs,
      method,
      phone:       payerPhone || "N/A",
      provider_ref:`${method.toUpperCase()}-${Date.now()}`,
      status:      "success",
      risk_score:  5,
      risk_flags:  [],
      date,
      settled:     false,
    };

    // 2. Update invoice — reduce balance, update status
    setInvoices(prev => prev.map(inv => {
      if (inv.id !== invoiceId) return inv;
      const newPaid    = inv.paid_tzs + amountTzs;
      const newBalance = inv.amount_tzs - newPaid;
      const newStatus  = newBalance <= 0 ? "paid" : newPaid > 0 ? "partial" : "unpaid";
      newTxn.student_id = inv.student_id;
      return { ...inv, paid_tzs: newPaid, balance_tzs: Math.max(0, newBalance), status: newStatus };
    }));

    // 3. Add transaction
    setTransactions(prev => [newTxn, ...prev]);

    // 4. Add double-entry ledger entries
    const entryNo = String(Date.now()).slice(-4);
    const accountCode = { mpesa:"1001", tigo_pesa:"1002", airtel:"1003", halopesa:"1004", crdb:"1005", nmb:"1006", amana:"1007" }[method] || "1001";
    const accountName = { mpesa:"Cash — M-Pesa", tigo_pesa:"Cash — Tigo Pesa", airtel:"Cash — Airtel", halopesa:"Cash — HaloPesa", crdb:"Cash — CRDB", nmb:"Cash — NMB", amana:"Cash — Amana" }[method] || "Cash";

    setLedger(prev => [
      ...prev,
      { id:`led-dr-${Date.now()}`, txn_id:newTxn.id, entry_no:entryNo, account_code:accountCode, account_name:accountName,   entry_type:"debit",  amount_tzs:amountTzs, description:`Payment via ${method} — ${txRef}`, recorded_at: now.replace("T"," ").slice(0,19) },
      { id:`led-cr-${Date.now()}`, txn_id:newTxn.id, entry_no:entryNo, account_code:"2001",       account_name:"Fees Receivable", entry_type:"credit", amount_tzs:amountTzs, description:`Invoice ${invoiceId} settled`,     recorded_at: now.replace("T"," ").slice(0,19) },
    ]);

    return newTxn;
  };

  // ── Add new invoices (bulk or single) ─────────────────────────────────────
  const addInvoices = (newInvoices) => {
    setInvoices(prev => [...prev, ...newInvoices]);
  };

  // Wait until data is initialized
  if (!invoices) return null;

  return (
    <DataContext.Provider value={{ invoices, setInvoices, transactions, setTransactions, ledger, setLedger, processPayment, addInvoices }}>
      {children}
    </DataContext.Provider>
  );
}

const useData = () => useContext(DataContext);
const CHART_OF_ACCOUNTS = [
  { code:"1001", name:"Cash — M-Pesa",        type:"Asset"    },
  { code:"1002", name:"Cash — Tigo Pesa",      type:"Asset"    },
  { code:"1003", name:"Cash — Airtel",         type:"Asset"    },
  { code:"1004", name:"Cash — HaloPesa",       type:"Asset"    },
  { code:"1005", name:"Cash — CRDB SimBanking",type:"Asset"    },
  { code:"1006", name:"Cash — NMB Mobile",     type:"Asset"    },
  { code:"1007", name:"Cash — Amana Bank",     type:"Asset"    },
  { code:"2001", name:"Fees Receivable",       type:"Asset"    },
  { code:"3001", name:"School Fee Revenue",    type:"Revenue"  },
  { code:"4001", name:"Refunds Payable",       type:"Liability"},
  { code:"5001", name:"Platform Commission",   type:"Revenue"  },
  { code:"6001", name:"Suspense Account",      type:"Liability"},
];

const METHOD_ACCOUNT = { mpesa:"1001", tigo_pesa:"1002", airtel:"1003", halopesa:"1004", crdb:"1005", nmb:"1006", amana:"1007" };

const initStudents = [
  { id:"st1", student_no:"STU001", name:"Amara Osei",    grade:"Form 4", parent_phone:"0712345001", parent_email:"amara.parent@gmail.com", school_id:"s1" },
  { id:"st2", student_no:"STU002", name:"Kofi Juma",     grade:"Form 2", parent_phone:"0712345002", parent_email:"kofi.parent@gmail.com",   school_id:"s1" },
  { id:"st3", student_no:"STU003", name:"Fatuma Hassan", grade:"Form 3", parent_phone:"0712345003", parent_email:"fatuma.parent@gmail.com", school_id:"s1" },
  { id:"st4", student_no:"STU004", name:"James Nkrumah", grade:"Form 1", parent_phone:"0712345004", parent_email:"james.parent@gmail.com",  school_id:"s1" },
  { id:"st5", student_no:"STU005", name:"Esi Makwela",   grade:"Form 2", parent_phone:"0712345005", parent_email:"esi.parent@gmail.com",    school_id:"s1" },
  { id:"st6", student_no:"STU006", name:"Lydia Tetteh",  grade:"Form 4", parent_phone:"0712345006", parent_email:"lydia.parent@gmail.com",  school_id:"s1" },
];

const initInvoices = [
  { id:"inv1", ref:"INV-2026-AZA-STU001-T1", student_id:"st1", school_id:"s1", amount_tzs:480000, paid_tzs:480000, balance_tzs:0,      status:"paid",    term:"1", year:2026, due_date:"2026-06-30", created_at:"2026-04-01" },
  { id:"inv2", ref:"INV-2026-AZA-STU002-T1", student_id:"st2", school_id:"s1", amount_tzs:380000, paid_tzs:190000, balance_tzs:190000, status:"partial", term:"1", year:2026, due_date:"2026-06-30", created_at:"2026-04-01" },
  { id:"inv3", ref:"INV-2026-AZA-STU003-T1", student_id:"st3", school_id:"s1", amount_tzs:430000, paid_tzs:0,      balance_tzs:430000, status:"unpaid",  term:"1", year:2026, due_date:"2026-06-30", created_at:"2026-04-01" },
  { id:"inv4", ref:"INV-2026-AZA-STU004-T1", student_id:"st4", school_id:"s1", amount_tzs:350000, paid_tzs:350000, balance_tzs:0,      status:"paid",    term:"1", year:2026, due_date:"2026-06-30", created_at:"2026-04-01" },
  { id:"inv5", ref:"INV-2026-AZA-STU005-T1", student_id:"st5", school_id:"s1", amount_tzs:380000, paid_tzs:150000, balance_tzs:230000, status:"partial", term:"1", year:2026, due_date:"2026-06-30", created_at:"2026-04-01" },
  { id:"inv6", ref:"INV-2026-AZA-STU006-T1", student_id:"st6", school_id:"s1", amount_tzs:480000, paid_tzs:0,      balance_tzs:480000, status:"unpaid",  term:"1", year:2026, due_date:"2026-06-30", created_at:"2026-04-01" },
];

const initTransactions = [
  { id:"t1", ref:"EDP-2026-A1B2C3", invoice_id:"inv1", student_id:"st1", school_id:"s1", amount_tzs:480000, method:"mpesa",    phone:"0712***001", provider_ref:"MP202605100001", status:"success",  risk_score:5,  risk_flags:[],                       date:"2026-05-10", settled:true  },
  { id:"t2", ref:"EDP-2026-D4E5F6", invoice_id:"inv4", student_id:"st4", school_id:"s1", amount_tzs:350000, method:"tigo_pesa",phone:"0652***004", provider_ref:"TG202605110002", status:"success",  risk_score:3,  risk_flags:[],                       date:"2026-05-11", settled:true  },
  { id:"t3", ref:"EDP-2026-G7H8I9", invoice_id:"inv2", student_id:"st2", school_id:"s1", amount_tzs:190000, method:"mpesa",    phone:"0712***002", provider_ref:"MP202605120003", status:"success",  risk_score:12, risk_flags:[],                       date:"2026-05-12", settled:false },
  { id:"t4", ref:"EDP-2026-J1K2L3", invoice_id:"inv5", student_id:"st5", school_id:"s1", amount_tzs:150000, method:"halopesa", phone:"0621***005", provider_ref:"HP202605130004", status:"pending",  risk_score:8,  risk_flags:[],                       date:"2026-05-13", settled:false },
  { id:"t5", ref:"EDP-2026-M4N5O6", invoice_id:"inv1", student_id:"st1", school_id:"s1", amount_tzs:480000, method:"crdb",     phone:"N/A",        provider_ref:"CR202605140005", status:"success",  risk_score:45, risk_flags:["HIGH_AMOUNT"],          date:"2026-05-14", settled:true  },
  { id:"t6", ref:"EDP-2026-P7Q8R9", invoice_id:"inv3", student_id:"st3", school_id:"s1", amount_tzs:430000, method:"mpesa",    phone:"0712***003", provider_ref:"",               status:"failed",   risk_score:90, risk_flags:["HIGH_AMOUNT","VELOCITY"],date:"2026-05-15", settled:false },
];

// ── Double-entry ledger entries ───────────────────────────────────────────────
const initLedger = [
  { id:"led1", txn_id:"t1", entry_no:"001", account_code:"1001", account_name:"Cash — M-Pesa",     entry_type:"debit",  amount_tzs:480000, description:"Payment from Amara Osei via M-Pesa",    recorded_at:"2026-05-10 09:12:00" },
  { id:"led2", txn_id:"t1", entry_no:"001", account_code:"2001", account_name:"Fees Receivable",   entry_type:"credit", amount_tzs:480000, description:"Invoice INV-2026-AZA-STU001-T1 settled", recorded_at:"2026-05-10 09:12:00" },
  { id:"led3", txn_id:"t2", entry_no:"002", account_code:"1002", account_name:"Cash — Tigo Pesa",  entry_type:"debit",  amount_tzs:350000, description:"Payment from James Nkrumah via Tigo",   recorded_at:"2026-05-11 10:34:00" },
  { id:"led4", txn_id:"t2", entry_no:"002", account_code:"2001", account_name:"Fees Receivable",   entry_type:"credit", amount_tzs:350000, description:"Invoice INV-2026-AZA-STU004-T1 settled", recorded_at:"2026-05-11 10:34:00" },
  { id:"led5", txn_id:"t3", entry_no:"003", account_code:"1001", account_name:"Cash — M-Pesa",     entry_type:"debit",  amount_tzs:190000, description:"Partial payment from Kofi Juma via M-Pesa",recorded_at:"2026-05-12 14:22:00" },
  { id:"led6", txn_id:"t3", entry_no:"003", account_code:"2001", account_name:"Fees Receivable",   entry_type:"credit", amount_tzs:190000, description:"Partial payment INV-2026-AZA-STU002-T1",  recorded_at:"2026-05-12 14:22:00" },
  { id:"led7", txn_id:"t5", entry_no:"004", account_code:"1005", account_name:"Cash — CRDB",       entry_type:"debit",  amount_tzs:480000, description:"Payment via CRDB SimBanking",             recorded_at:"2026-05-14 08:05:00" },
  { id:"led8", txn_id:"t5", entry_no:"004", account_code:"2001", account_name:"Fees Receivable",   entry_type:"credit", amount_tzs:480000, description:"Invoice INV-2026-AZA-STU001-T1 settled", recorded_at:"2026-05-14 08:05:00" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════
const css = `
  @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.5} }
  @keyframes slideIn  { from{transform:translateX(-20px);opacity:0} to{transform:translateX(0);opacity:1} }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans','Helvetica Neue',sans-serif; }
  input,select,textarea,button { font-family:inherit; }
  input::placeholder { color:rgba(0,0,0,.3); }
  ::-webkit-scrollbar { width:6px; height:6px; }
  ::-webkit-scrollbar-track { background:#f1f5f9; }
  ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:3px; }
`;

const StatusBadge = ({ status }) => {
  const map = {
    paid:"#dcfce7:#166534", success:"#dcfce7:#166534", settled:"#dcfce7:#166534", matched:"#dcfce7:#166534", active:"#dcfce7:#166534", cleared:"#dcfce7:#166534",
    partial:"#fef9c3:#854d0e", pending:"#fef9c3:#854d0e", processing:"#fef9c3:#854d0e",
    unpaid:"#fee2e2:#991b1b",  failed:"#fee2e2:#991b1b",  unmatched:"#fee2e2:#991b1b", reversed:"#fee2e2:#991b1b",
    debit:"#dbeafe:#1e40af",   credit:"#f3e8ff:#6b21a8",
    low:"#dcfce7:#166534",     medium:"#fef9c3:#854d0e",  high:"#fee2e2:#991b1b",  critical:"#fce7f3:#9d174d",
  };
  const [bg,color] = (map[status?.toLowerCase()]||"#f1f5f9:#374151").split(":");
  return <span style={{ background:bg, color, borderRadius:DS.radius.full, padding:"2px 10px", fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>{status}</span>;
};

const MethodBadge = ({ method }) => {
  const map = {
    mpesa:     { bg:"#e8f5e9", color:"#1b5e20", dot:DS.color.mpesa,   label:"M-Pesa"     },
    tigo_pesa: { bg:"#e3f2fd", color:"#0d47a1", dot:DS.color.tigo,    label:"Tigo Pesa"  },
    airtel:    { bg:"#fce4ec", color:"#880e4f", dot:DS.color.airtel,  label:"Airtel"     },
    halopesa:  { bg:"#f3e5f5", color:"#4a148c", dot:DS.color.halo,    label:"HaloPesa"   },
    crdb:      { bg:"#fde8e8", color:"#7f1d1d", dot:DS.color.crdb,    label:"CRDB"       },
    nmb:       { bg:"#dbeafe", color:"#1e3a5f", dot:DS.color.nmb,     label:"NMB Mobile" },
    amana:     { bg:"#d1fae5", color:"#064e3b", dot:DS.color.amana,   label:"Amana Bank" },
  };
  const m = map[method] || { bg:"#f1f5f9", color:"#334155", dot:"#94a3b8", label:method };
  return (
    <span style={{ background:m.bg, color:m.color, borderRadius:DS.radius.full, padding:"2px 10px", fontSize:11, fontWeight:600, display:"inline-flex", alignItems:"center", gap:4 }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:m.dot }} />
      {m.label}
    </span>
  );
};

const Card = ({ children, style }) => (
  <div style={{ background:"#fff", borderRadius:DS.radius.lg, boxShadow:DS.shadow.sm, ...style }}>{children}</div>
);

const StatCard = ({ icon, label, value, sub, accent, index=0 }) => (
  <div style={{ background:"#fff", borderRadius:DS.radius.lg, padding:"18px 20px", boxShadow:DS.shadow.sm, borderTop:`4px solid ${accent}`, animation:`fadeUp .4s ease ${index*.08}s both` }}>
    <div style={{ fontSize:22, marginBottom:4 }}>{icon}</div>
    <div style={{ fontSize:22, fontWeight:700, color:"#0f172a", fontFamily:DS.font.display }}>{value}</div>
    <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{label}</div>
    {sub && <div style={{ fontSize:11, color:accent, marginTop:3, fontWeight:600 }}>{sub}</div>}
  </div>
);

const Toast = ({ msg, type }) => (
  <div style={{ position:"fixed", top:16, right:16, zIndex:9999, background:type==="error"?"#991b1b":type==="warn"?"#854d0e":"#166534", color:"#fff", borderRadius:DS.radius.md, padding:"12px 20px", fontSize:13, fontWeight:600, boxShadow:DS.shadow.lg, animation:"fadeIn .3s ease" }}>{msg}</div>
);

const Topbar = ({ role, user, onLogout, activeTab, setTab, tabs }) => {
  const rc = DS.color[role];
  const { t } = useLang();
  return (
    <div style={{ background:rc.bg, color:"#fff", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 28px", boxShadow:DS.shadow.md, position:"sticky", top:0, zIndex:100 }}>
      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:DS.radius.md, background:rc.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>💳</div>
          <span style={{ fontWeight:700, fontSize:17, fontFamily:DS.font.display }}>EduPay</span>
        </div>
        <div style={{ display:"flex", gap:2 }}>
          {tabs?.map(([k,v]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding:"5px 14px", borderRadius:DS.radius.full, border:"none", cursor:"pointer", fontFamily:DS.font.body, fontSize:12, fontWeight:activeTab===k?700:400, background:activeTab===k?"rgba(255,255,255,.2)":"transparent", color:"#fff", transition:"all .15s" }}>{t(k)||v}</button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <LangToggle />
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:13, fontWeight:600 }}>{user?.name}</div>
          <div style={{ fontSize:10, opacity:.6 }}>{user?.title}</div>
        </div>
        <div style={{ width:32, height:32, borderRadius:"50%", background:rc.accent, color:rc.bg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12 }}>{user?.avatar}</div>
        <button onClick={onLogout} style={{ padding:"5px 14px", borderRadius:DS.radius.full, background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", color:"#fff", cursor:"pointer", fontSize:11 }}>{t("signOut")}</button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 3 — LEDGER VIEWER COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
function LedgerView({ ledger, transactions }) {
  const groupedByEntry = ledger.reduce((acc, entry) => {
    const key = entry.entry_no;
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  const totalDebits  = ledger.filter(e => e.entry_type==="debit").reduce((a,b)  => a+b.amount_tzs, 0);
  const totalCredits = ledger.filter(e => e.entry_type==="credit").reduce((a,b) => a+b.amount_tzs, 0);
  const balanced     = totalDebits === totalCredits;

  return (
    <div>
      {/* Balance check */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:24 }}>
        {[
          { label:"totalDebits",  value:`TZS ${totalDebits.toLocaleString()}`,  color:"#1e40af", bg:"#dbeafe" },
          { label:"totalCredits", value:`TZS ${totalCredits.toLocaleString()}`, color:"#6b21a8", bg:"#f3e8ff" },
          { label:"balanceCheck", value:balanced?"✅ BALANCED":"⚠️ MISMATCH",   color:balanced?"#166534":"#991b1b", bg:balanced?"#dcfce7":"#fee2e2" },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:DS.radius.lg, padding:"16px 20px", textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:700, color:s.color, fontFamily:DS.font.display }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#64748b", marginTop:3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart of Accounts */}
      <Card style={{ marginBottom:24 }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", fontWeight:700, fontSize:14, color:"#0f172a" }}>📊 Chart of Accounts</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0 }}>
          {CHART_OF_ACCOUNTS.map((acc, i) => (
            <div key={acc.code} style={{ padding:"10px 16px", borderBottom:i<CHART_OF_ACCOUNTS.length-3?"1px solid #f8fafd":"none", borderRight:i%3!==2?"1px solid #f8fafd":"none", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:12, fontWeight:700, fontFamily:DS.font.mono, color:"#6366f1" }}>{acc.code}</div>
                <div style={{ fontSize:12, color:"#374151", marginTop:1 }}>{acc.name}</div>
              </div>
              <span style={{ fontSize:10, fontWeight:700, color:acc.type==="Asset"?"#166534":acc.type==="Revenue"?"#854d0e":"#991b1b", background:acc.type==="Asset"?"#dcfce7":acc.type==="Revenue"?"#fef9c3":"#fee2e2", borderRadius:DS.radius.full, padding:"1px 7px" }}>{acc.type}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Ledger entries */}
      <Card style={{ overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", fontWeight:700, fontSize:14, color:"#0f172a" }}>📒 Double-Entry Ledger</div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"#f8fafd" }}>
              {["Entry No","Account Code","Account Name","Type","Amount (TZS)","Description","Recorded At"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontSize:11, textTransform:"uppercase", letterSpacing:".04em", fontWeight:600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedByEntry).map(([entryNo, entries]) =>
              entries.map((entry, i) => (
                <tr key={entry.id} style={{ borderTop:"1px solid #f1f5f9", background:i===0?"#fafeff":"#fff" }}>
                  {i===0 && <td rowSpan={2} style={{ padding:"11px 14px", fontFamily:DS.font.mono, color:"#6366f1", fontWeight:700, verticalAlign:"middle", borderRight:"2px solid #e0e7ff" }}>{entryNo}</td>}
                  <td style={{ padding:"11px 14px", fontFamily:DS.font.mono, color:"#64748b", fontSize:11 }}>{entry.account_code}</td>
                  <td style={{ padding:"11px 14px", fontWeight:600 }}>{entry.account_name}</td>
                  <td style={{ padding:"11px 14px" }}><StatusBadge status={entry.entry_type} /></td>
                  <td style={{ padding:"11px 14px", fontWeight:700, color:entry.entry_type==="debit"?"#1e40af":"#6b21a8" }}>
                    {entry.entry_type==="debit" ? entry.amount_tzs.toLocaleString() : ""}
                    {entry.entry_type==="credit" ? entry.amount_tzs.toLocaleString() : ""}
                  </td>
                  <td style={{ padding:"11px 14px", color:"#64748b", fontSize:12 }}>{entry.description}</td>
                  <td style={{ padding:"11px 14px", color:"#64748b", fontSize:11, fontFamily:DS.font.mono }}>{entry.recorded_at}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr style={{ background:"#f0f9ff", borderTop:"2px solid #bae6fd" }}>
              <td colSpan={4} style={{ padding:"12px 14px", fontWeight:700, fontSize:13 }}>TOTALS</td>
              <td style={{ padding:"12px 14px", fontWeight:700, color:"#1e40af" }}>DR: {totalDebits.toLocaleString()}</td>
              <td colSpan={2} style={{ padding:"12px 14px", fontWeight:700, color:"#6b21a8" }}>CR: {totalCredits.toLocaleString()} {balanced ? "✅" : "⚠️"}</td>
            </tr>
          </tfoot>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 4 — RECONCILIATION VIEW
// ══════════════════════════════════════════════════════════════════════════════
function ReconciliationView({ transactions, invoices, students }) {
  const matched   = transactions.filter(t => t.status==="success").length;
  const pending   = transactions.filter(t => t.status==="pending").length;
  const failed    = transactions.filter(t => t.status==="failed").length;
  const unmatched = 0;

  const reconciliationSteps = [
    { step:"PaymentConfirmed",      done:true,  desc:"Provider webhook received and verified" },
    { step:"ReconciliationStarted", done:true,  desc:"Payment matched to student invoice" },
    { step:"LedgerUpdated",         done:true,  desc:"Double-entry debit and credit created" },
    { step:"BalanceUpdated",        done:true,  desc:"Invoice balance reduced accordingly" },
    { step:"ReceiptGenerated",      done:true,  desc:"Official receipt created and stored" },
    { step:"NotificationSent",      done:true,  desc:"SMS sent to parent and bursar" },
    { step:"AuditLogged",           done:true,  desc:"Immutable audit trail entry created" },
  ];

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[
          { label:"Matched",   value:matched,   color:"#166534", bg:"#dcfce7", icon:"✅" },
          { label:"Pending",   value:pending,   color:"#854d0e", bg:"#fef9c3", icon:"⏳" },
          { label:"Failed",    value:failed,    color:"#991b1b", bg:"#fee2e2", icon:"❌" },
          { label:"Unmatched", value:unmatched, color:"#1e40af", bg:"#dbeafe", icon:"🔍" },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:DS.radius.lg, padding:"18px 20px", textAlign:"center" }}>
            <div style={{ fontSize:28 }}>{s.icon}</div>
            <div style={{ fontSize:26, fontWeight:700, color:s.color, fontFamily:DS.font.display }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Reconciliation flow */}
      <Card style={{ padding:24, marginBottom:24 }}>
        <div style={{ fontWeight:700, fontSize:14, marginBottom:20, color:"#0f172a" }}>⚡ Payment Lifecycle Flow</div>
        <div style={{ display:"flex", alignItems:"center", gap:0, overflowX:"auto", paddingBottom:8 }}>
          {reconciliationSteps.map((s, i) => (
            <div key={s.step} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
              <div style={{ textAlign:"center", width:110 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:s.done?"#166534":"#e2e8f0", color:s.done?"#fff":"#94a3b8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, margin:"0 auto 6px", fontWeight:700 }}>{s.done?"✓":i+1}</div>
                <div style={{ fontSize:11, fontWeight:700, color:s.done?"#166534":"#94a3b8", lineHeight:1.3 }}>{s.step}</div>
                <div style={{ fontSize:10, color:"#94a3b8", marginTop:2, lineHeight:1.3 }}>{s.desc}</div>
              </div>
              {i < reconciliationSteps.length-1 && (
                <div style={{ width:24, height:2, background:s.done?"#166534":"#e2e8f0", flexShrink:0 }} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Per-student reconciliation */}
      <Card style={{ overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", fontWeight:700, fontSize:14 }}>Student Reconciliation Status</div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"#f8fafd" }}>
              {["Student","Invoice Ref","Expected (TZS)","Received (TZS)","Balance (TZS)","Difference","Status"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontSize:11, textTransform:"uppercase", letterSpacing:".04em", fontWeight:600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => {
              const student = students.find(s => s.id===inv.student_id);
              const diff    = inv.amount_tzs - inv.paid_tzs - inv.balance_tzs;
              return (
                <tr key={inv.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"#fff":"#fafcff" }}>
                  <td style={{ padding:"11px 14px", fontWeight:600 }}>{student?.name}</td>
                  <td style={{ padding:"11px 14px", fontFamily:DS.font.mono, fontSize:11, color:"#6366f1" }}>{inv.ref}</td>
                  <td style={{ padding:"11px 14px" }}>{inv.amount_tzs.toLocaleString()}</td>
                  <td style={{ padding:"11px 14px", color:"#166534", fontWeight:600 }}>{inv.paid_tzs.toLocaleString()}</td>
                  <td style={{ padding:"11px 14px", color:inv.balance_tzs>0?"#991b1b":"#166534", fontWeight:600 }}>{inv.balance_tzs.toLocaleString()}</td>
                  <td style={{ padding:"11px 14px", color:diff===0?"#166534":"#991b1b", fontWeight:700 }}>{diff===0?"✅ 0":"⚠️ "+diff}</td>
                  <td style={{ padding:"11px 14px" }}><StatusBadge status={inv.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 5 — AUDIT LOG VIEW
// ══════════════════════════════════════════════════════════════════════════════
function AuditView({ auditLog }) {
  const systemAudit = [
    { id:"sys1", action:"SYSTEM_STARTUP",       resource:"system",       result:"success", riskLevel:"low",      user_name:"system",        ip:"internal",    timestamp:"2026-05-17 06:00:00" },
    { id:"sys2", action:"CRON_RECONCILIATION",  resource:"reconciliation",result:"success", riskLevel:"low",      user_name:"system",        ip:"internal",    timestamp:"2026-05-16 23:00:00" },
    { id:"sys3", action:"WEBHOOK_RECEIVED",     resource:"integrations", result:"success", riskLevel:"low",      user_name:"mpesa",          ip:"196.201.214.1",timestamp:"2026-05-16 14:22:00" },
    { id:"sys4", action:"LOGIN_FAILED",         resource:"auth",         result:"failure", riskLevel:"high",     user_name:"unknown",       ip:"45.33.32.156", timestamp:"2026-05-16 11:15:00" },
    { id:"sys5", action:"TRANSACTION_BLOCKED",  resource:"payments",     result:"blocked", riskLevel:"critical", user_name:"risk_engine",   ip:"internal",    timestamp:"2026-05-15 22:34:00" },
    { id:"sys6", action:"SMS_SENT",             resource:"notifications",result:"success", riskLevel:"low",      user_name:"system",        ip:"internal",    timestamp:"2026-05-15 10:12:00" },
    { id:"sys7", action:"REPORT_GENERATED",     resource:"reporting",    result:"success", riskLevel:"low",      user_name:"Amina Rashid",  ip:"197.186.x.x", timestamp:"2026-05-15 09:00:00" },
    { id:"sys8", action:"INVOICE_CREATED",      resource:"invoices",     result:"success", riskLevel:"low",      user_name:"Azania Secondary",ip:"197.186.x.x",timestamp:"2026-04-01 08:00:00" },
  ];

  const allLogs = [...auditLog, ...systemAudit].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
  const critical = allLogs.filter(l => l.riskLevel==="critical").length;
  const high     = allLogs.filter(l => l.riskLevel==="high").length;
  const failures = allLogs.filter(l => l.result==="failure"||l.result==="blocked").length;

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[
          { label:"totalEvents",    value:allLogs.length,  color:"#1e40af", bg:"#dbeafe", icon:"📋" },
          { label:"criticalEvents", value:critical,        color:"#9d174d", bg:"#fce7f3", icon:"🚨" },
          { label:"highRisk",       value:high,            color:"#991b1b", bg:"#fee2e2", icon:"⚠️" },
          { label:"failuresBlocks", value:failures,        color:"#854d0e", bg:"#fef9c3", icon:"🔒" },
        ].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:DS.radius.lg, padding:"18px 20px", textAlign:"center" }}>
            <div style={{ fontSize:24 }}>{s.icon}</div>
            <div style={{ fontSize:24, fontWeight:700, color:s.color, fontFamily:DS.font.display }}>{s.value}</div>
            <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <Card style={{ overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontWeight:700, fontSize:14 }}>🔐 Immutable Audit Trail</span>
          <span style={{ fontSize:11, color:"#64748b" }}>Append-only · Cannot be modified or deleted</span>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr style={{ background:"#f8fafd" }}>
              {["Timestamp","User","Action","Resource","Result","Risk","IP Address"].map(h => (
                <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontSize:11, textTransform:"uppercase", letterSpacing:".04em", fontWeight:600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allLogs.slice(0,20).map((log, i) => (
              <tr key={log.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"#fff":"#fafcff" }}>
                <td style={{ padding:"10px 14px", fontFamily:DS.font.mono, fontSize:11, color:"#64748b" }}>{log.timestamp}</td>
                <td style={{ padding:"10px 14px", fontWeight:600, fontSize:12 }}>{log.user_name}</td>
                <td style={{ padding:"10px 14px", fontFamily:DS.font.mono, fontSize:11, color:"#6366f1" }}>{log.action}</td>
                <td style={{ padding:"10px 14px", color:"#64748b" }}>{log.resource}</td>
                <td style={{ padding:"10px 14px" }}><StatusBadge status={log.result} /></td>
                <td style={{ padding:"10px 14px" }}><StatusBadge status={log.riskLevel} /></td>
                <td style={{ padding:"10px 14px", fontFamily:DS.font.mono, fontSize:11, color:"#94a3b8" }}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULE 6 — REPORTING VIEW
// ══════════════════════════════════════════════════════════════════════════════
function ReportingView({ students, invoices, transactions }) {
  const [activeReport, setActiveReport] = useState("collection");
  const totalFees      = invoices.reduce((a,b) => a+b.amount_tzs, 0);
  const totalPaid      = invoices.reduce((a,b) => a+b.paid_tzs, 0);
  const collectionRate = Math.round(totalPaid/totalFees*100);

  const methodSummary = ["mpesa","tigo_pesa","airtel","halopesa","crdb","nmb"].map(m => ({
    method: m,
    count:  transactions.filter(t => t.method===m && t.status==="success").length,
    amount: transactions.filter(t => t.method===m && t.status==="success").reduce((a,b) => a+b.amount_tzs, 0),
  })).filter(m => m.count > 0);

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
        {[["collection","📊 Collection"],["student","👤 Student"],["ledger_report","📒 Ledger"],["platform","🌍 Platform"]].map(([k,v]) => (
          <button key={k} onClick={() => setActiveReport(k)} style={{ padding:"7px 16px", borderRadius:DS.radius.md, border:"none", cursor:"pointer", fontFamily:DS.font.body, fontSize:13, fontWeight:activeReport===k?700:400, background:activeReport===k?"#0f2d4a":"#e8f0fb", color:activeReport===k?"#fff":"#0f2d4a" }}>{v}</button>
        ))}
      </div>

      {activeReport==="collection" && (
        <div>
          <Card style={{ padding:28, marginBottom:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div>
                <div style={{ fontWeight:900, fontSize:20, fontFamily:DS.font.display, color:"#0f2d4a" }}>School Collection Report</div>
                <div style={{ fontSize:13, color:"#64748b", marginTop:2 }}>Azania Secondary School · Term 1, 2026</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:11, color:"#64748b" }}>Generated</div>
                <div style={{ fontSize:12, fontWeight:600 }}>17 May 2026</div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
              {[
                { label:"Total Students",    value:students.length,                   color:"#1e40af" },
                { label:"Total Invoiced",    value:`TZS ${totalFees.toLocaleString()}`,color:"#374151" },
                { label:"Total Collected",   value:`TZS ${totalPaid.toLocaleString()}`,color:"#166534" },
                { label:"Collection Rate",   value:`${collectionRate}%`,               color:collectionRate>=80?"#166534":collectionRate>=50?"#854d0e":"#991b1b" },
              ].map(s => (
                <div key={s.label} style={{ background:"#f8fafd", borderRadius:DS.radius.md, padding:"14px 16px", textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:700, color:s.color, fontFamily:DS.font.display }}>{s.value}</div>
                  <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>By Payment Method</div>
            {methodSummary.map(m => (
              <div key={m.method} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                <div style={{ width:120 }}><MethodBadge method={m.method} /></div>
                <div style={{ flex:1, height:8, background:"#e2e8f0", borderRadius:DS.radius.full }}>
                  <div style={{ height:"100%", width:`${Math.round(m.amount/totalPaid*100)}%`, background:"#0f2d4a", borderRadius:DS.radius.full }} />
                </div>
                <div style={{ width:80, fontSize:12, fontWeight:600, textAlign:"right" }}>TZS {(m.amount/1000).toFixed(0)}K</div>
                <div style={{ width:30, fontSize:11, color:"#64748b" }}>{Math.round(m.amount/totalPaid*100)}%</div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {activeReport==="student" && (
        <Card style={{ overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", fontWeight:700, fontSize:14 }}>Student Fee Report — Term 1, 2026</div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:"#f8fafd" }}>
                {["Student","ID","Grade","Total (TZS)","Paid (TZS)","Balance (TZS)","Rate","Status"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontSize:11, textTransform:"uppercase", letterSpacing:".04em", fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const student = students.find(s => s.id===inv.student_id);
                const rate    = Math.round(inv.paid_tzs/inv.amount_tzs*100);
                return (
                  <tr key={inv.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"#fff":"#fafcff" }}>
                    <td style={{ padding:"11px 14px", fontWeight:600 }}>{student?.name}</td>
                    <td style={{ padding:"11px 14px", fontFamily:DS.font.mono, color:"#64748b", fontSize:11 }}>{student?.student_no}</td>
                    <td style={{ padding:"11px 14px", color:"#64748b" }}>{student?.grade}</td>
                    <td style={{ padding:"11px 14px" }}>{inv.amount_tzs.toLocaleString()}</td>
                    <td style={{ padding:"11px 14px", color:"#166534", fontWeight:600 }}>{inv.paid_tzs.toLocaleString()}</td>
                    <td style={{ padding:"11px 14px", color:inv.balance_tzs>0?"#991b1b":"#166534", fontWeight:600 }}>{inv.balance_tzs.toLocaleString()}</td>
                    <td style={{ padding:"11px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <div style={{ width:50, height:5, background:"#e2e8f0", borderRadius:3 }}>
                          <div style={{ height:"100%", width:`${rate}%`, background:rate===100?"#22c55e":rate>50?"#f59e0b":"#ef4444", borderRadius:3 }} />
                        </div>
                        <span style={{ fontSize:11, fontWeight:600 }}>{rate}%</span>
                      </div>
                    </td>
                    <td style={{ padding:"11px 14px" }}><StatusBadge status={inv.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}

      {activeReport==="ledger_report" && (
        <Card style={{ padding:24 }}>
          <div style={{ fontWeight:900, fontSize:18, fontFamily:DS.font.display, marginBottom:4 }}>Ledger Report</div>
          <div style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>Azania Secondary · May 2026 · Double-Entry Format</div>
          <div style={{ fontFamily:DS.font.mono, fontSize:12, background:"#f8fafd", borderRadius:DS.radius.md, padding:20, lineHeight:2.2 }}>
            <div style={{ borderBottom:"1px solid #e2e8f0", paddingBottom:8, marginBottom:8, fontWeight:700, display:"grid", gridTemplateColumns:"80px 1fr 120px 120px" }}>
              <span>Entry</span><span>Account</span><span style={{ textAlign:"right" }}>Debit (TZS)</span><span style={{ textAlign:"right" }}>Credit (TZS)</span>
            </div>
            {Object.entries(initLedger.reduce((acc,e) => { if(!acc[e.entry_no])acc[e.entry_no]=[]; acc[e.entry_no].push(e); return acc; }, {})).map(([no, entries]) => (
              <div key={no}>
                {entries.map(e => (
                  <div key={e.id} style={{ display:"grid", gridTemplateColumns:"80px 1fr 120px 120px", color:e.entry_type==="debit"?"#1e40af":"#6b21a8" }}>
                    <span style={{ color:"#6366f1" }}>{e.entry_no}</span>
                    <span>{e.account_name}</span>
                    <span style={{ textAlign:"right" }}>{e.entry_type==="debit"?e.amount_tzs.toLocaleString():""}</span>
                    <span style={{ textAlign:"right" }}>{e.entry_type==="credit"?e.amount_tzs.toLocaleString():""}</span>
                  </div>
                ))}
                <div style={{ borderBottom:"1px dashed #e2e8f0", margin:"4px 0" }} />
              </div>
            ))}
            <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 120px 120px", fontWeight:700, marginTop:8, borderTop:"2px solid #0f172a", paddingTop:8 }}>
              <span></span><span>TOTAL</span>
              <span style={{ textAlign:"right", color:"#1e40af" }}>{initLedger.filter(e=>e.entry_type==="debit").reduce((a,b)=>a+b.amount_tzs,0).toLocaleString()}</span>
              <span style={{ textAlign:"right", color:"#6b21a8" }}>{initLedger.filter(e=>e.entry_type==="credit").reduce((a,b)=>a+b.amount_tzs,0).toLocaleString()}</span>
            </div>
            <div style={{ marginTop:12, color:"#166534", fontWeight:700 }}>✅ BALANCED — Debits equal Credits</div>
          </div>
        </Card>
      )}

      {activeReport==="platform" && (
        <Card style={{ padding:28 }}>
          <div style={{ fontWeight:900, fontSize:20, fontFamily:DS.font.display, marginBottom:4 }}>Platform Report</div>
          <div style={{ fontSize:13, color:"#64748b", marginBottom:24 }}>EduPay Connect · May 2026 · Investor View</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:14, color:"#0f172a" }}>Platform Metrics</div>
              {[
                ["Schools Active","12"],["Total Students","8,847"],["Transactions (MTD)","3,241"],
                ["Volume (MTD)","TZS 892,430,000"],["Commission (MTD)","TZS 4,462,150"],["Avg Transaction","TZS 275,000"],
              ].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f1f5f9", fontSize:13 }}>
                  <span style={{ color:"#64748b" }}>{k}</span>
                  <span style={{ fontWeight:700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:14, color:"#0f172a" }}>Africa Expansion</div>
              {[
                ["Tanzania 🇹🇿","Live","#166534"],["Kenya 🇰🇪","Q3 2026","#854d0e"],
                ["Uganda 🇺🇬","Q4 2026","#854d0e"],["Rwanda 🇷🇼","Q1 2027","#94a3b8"],
                ["Ghana 🇬🇭","Q2 2027","#94a3b8"],["Nigeria 🇳🇬","Q3 2027","#94a3b8"],
              ].map(([c,s,col]) => (
                <div key={c} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f1f5f9", fontSize:13 }}>
                  <span style={{ fontWeight:600 }}>{c}</span>
                  <span style={{ color:col, fontWeight:700, fontSize:12 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCHOOL DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function SchoolDashboard() {
  const { user, logout, audit, auditLog } = useAuth();
  const { invoices, transactions, ledger, addInvoices } = useData();
  const { t } = useLang();
  const [tab, setTab]       = useState("overview");
  const [students]          = useState(initStudents);
  const [search, setSearch] = useState("");
  const [toast, setToast]   = useState(null);
  const [invoiceForm, setInvoiceForm] = useState({ studentId:"", amount:"", term:"1", year:"2026", dueDate:"" });
  const rc = DS.color.school;

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  const totalFees   = invoices.reduce((a,b) => a+b.amount_tzs, 0);
  const totalPaid   = invoices.reduce((a,b) => a+b.paid_tzs, 0);
  const outstanding = totalFees - totalPaid;
  const filtered    = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.student_no.includes(search));

  const tabs = [["overview","Overview"],["students","Students"],["invoices","Invoices"],["ledger","Ledger"],["reconciliation","Reconciliation"],["reports","Reports"],["audit","Audit"]];

  const createInvoice = () => {
    const student = students.find(s => s.student_no === invoiceForm.studentId);
    if (!student) { showToast("Student not found", "error"); return; }
    const ref = `INV-${invoiceForm.year}-AZA-${invoiceForm.studentId}-T${invoiceForm.term}`;
    const newInv = { id:`inv${Date.now()}`, ref, student_id:student.id, school_id:"s1", amount_tzs:parseInt(invoiceForm.amount), paid_tzs:0, balance_tzs:parseInt(invoiceForm.amount), status:"unpaid", term:invoiceForm.term, year:parseInt(invoiceForm.year), due_date:invoiceForm.dueDate, created_at:new Date().toISOString().split("T")[0] };
    addInvoices([newInv]); // ← updates shared store
    audit("INVOICE_CREATED","invoices","success","low");
    showToast(`Invoice ${ref} created successfully`);
    setInvoiceForm({ studentId:"", amount:"", term:"1", year:"2026", dueDate:"" });
  };

  return (
    <div style={{ minHeight:"100vh", background:rc.light, fontFamily:DS.font.body }}>
      <style>{css}</style>
      <FontLoader />
      {toast && <Toast {...toast} />}
      <Topbar role="school" user={user} onLogout={logout} activeTab={tab} setTab={setTab} tabs={tabs} />

      <div style={{ padding:"28px 28px 40px" }}>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:24, fontWeight:900, fontFamily:DS.font.display, color:rc.bg }}>{t("welcomeBack")}, {user?.name} 👋</div>
          <div style={{ fontSize:13, color:"#64748b", marginTop:2 }}>{t("academicYear")}</div>
        </div>

        {tab==="overview" && <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
            <StatCard icon="👥" label={t("totalStudents")}  value={students.length}              sub={t("enrolled")}                              accent={rc.accent} index={0} />
            <StatCard icon="📋" label={t("totalFees")}      value={totalFees.toLocaleString()}   sub={t("expectedTerm")}                          accent={rc.accent} index={1} />
            <StatCard icon="✅" label={t("collected")}      value={totalPaid.toLocaleString()}   sub={`${Math.round(totalPaid/totalFees*100)}% ${t("collected").toLowerCase()}`} accent={rc.accent} index={2} />
            <StatCard icon="⏳" label={t("outstanding")}    value={outstanding.toLocaleString()} sub={t("balanceDue")}                             accent={rc.accent} index={3} />
          </div>

          {/* Mobile money breakdown */}
          <Card style={{ padding:20, marginBottom:24 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:14, color:rc.bg }}>{t("collectByMethod")}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:10 }}>
              {[
                { m:"mpesa",     label:"M-Pesa",    pct:45, color:DS.color.mpesa  },
                { m:"tigo_pesa", label:"Tigo Pesa", pct:18, color:DS.color.tigo   },
                { m:"airtel",    label:"Airtel",    pct:10, color:DS.color.airtel },
                { m:"halopesa",  label:"HaloPesa",  pct:6,  color:DS.color.halo  },
                { m:"crdb",      label:"CRDB",      pct:12, color:DS.color.crdb  },
                { m:"nmb",       label:"NMB",       pct:7,  color:DS.color.nmb   },
                { m:"amana",     label:"Amana",     pct:2,  color:DS.color.amana },
              ].map(n => (
                <div key={n.m} style={{ padding:12, borderRadius:DS.radius.md, border:`2px solid ${n.color}22`, background:`${n.color}09`, textAlign:"center" }}>
                  <div style={{ fontWeight:700, color:n.color, fontSize:12, marginBottom:4 }}>{n.label}</div>
                  <div style={{ height:5, background:"#e2e8f0", borderRadius:DS.radius.full, marginBottom:4 }}>
                    <div style={{ height:"100%", width:`${n.pct}%`, background:n.color, borderRadius:DS.radius.full }} />
                  </div>
                  <div style={{ fontSize:11, color:"#64748b" }}>{n.pct}%</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent transactions */}
          <Card style={{ overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", fontWeight:700, color:rc.bg }}>{t("recentTransactions")}</div>
            {transactions.slice(0,5).map((t,i) => {
              const student = students.find(s => s.id===t.student_id);
              return (
                <div key={t.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 20px", borderBottom:i<4?"1px solid #f8fafd":"none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:rc.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>💳</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13 }}>{student?.name}</div>
                      <div style={{ fontSize:11, color:"#94a3b8", display:"flex", alignItems:"center", gap:6 }}><MethodBadge method={t.method} /> · {t.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:700, fontSize:13 }}>TZS {t.amount_tzs.toLocaleString()}</div>
                    <StatusBadge status={t.status} />
                  </div>
                </div>
              );
            })}
          </Card>
        </>}

        {tab==="students" && (
          <Card style={{ overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontWeight:700, color:rc.bg }}>{t("studentFeeRecords")}</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("searchStudent")} style={{ padding:"7px 12px", borderRadius:DS.radius.md, border:"1px solid #cbd5e1", fontSize:13, outline:"none", width:220 }} />
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead><tr style={{ background:"#f8fafd" }}>
                {[t("studentNo"),t("student"),t("grade"),t("fees"),t("paid"),t("balance"),t("status"),t("action")].map(h => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontSize:11, textTransform:"uppercase", letterSpacing:".04em", fontWeight:600 }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filtered.map((s,i) => {
                  const inv = invoices.find(v => v.student_id===s.id);
                  return (
                    <tr key={s.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"#fff":"#fafcff" }}>
                      <td style={{ padding:"11px 14px", fontFamily:DS.font.mono, color:"#64748b", fontSize:11 }}>{s.student_no}</td>
                      <td style={{ padding:"11px 14px", fontWeight:600 }}>{s.name}</td>
                      <td style={{ padding:"11px 14px", color:"#64748b" }}>{s.grade}</td>
                      <td style={{ padding:"11px 14px" }}>{inv?.amount_tzs.toLocaleString()}</td>
                      <td style={{ padding:"11px 14px", color:"#166534", fontWeight:600 }}>{inv?.paid_tzs.toLocaleString()}</td>
                      <td style={{ padding:"11px 14px", color:inv?.balance_tzs>0?"#991b1b":"#166534", fontWeight:600 }}>{inv?.balance_tzs.toLocaleString()}</td>
                      <td style={{ padding:"11px 14px" }}><StatusBadge status={inv?.status} /></td>
                      <td style={{ padding:"11px 14px" }}>
                        {inv?.balance_tzs>0 && (
                          <button onClick={()=>{ audit("SMS_REMINDER_SENT","notifications"); showToast(t("reminderSent")); }} style={{ padding:"4px 10px", borderRadius:DS.radius.sm, border:`1px solid ${rc.bg}`, background:"transparent", color:rc.bg, fontSize:11, cursor:"pointer" }}>{t("remind")}</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}

        {tab==="invoices" && (
          <div style={{ display:"grid", gridTemplateColumns:"400px 1fr", gap:24 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

              {/* ── BULK INVOICE GENERATOR ── */}
              <Card style={{ padding:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:20 }}>⚡</span>
                  <div style={{ fontWeight:700, fontSize:16, color:rc.bg, fontFamily:DS.font.display }}>{t("bulkInvoiceGen")}</div>
                </div>
                <div style={{ fontSize:12, color:"#64748b", marginBottom:16 }}>{t("bulkInvoiceDesc")}</div>

                {/* Term + Year + Due date */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, marginBottom:5 }}>Term</label>
                    <select
                      value={invoiceForm.term}
                      onChange={e=>setInvoiceForm(f=>({...f,term:e.target.value}))}
                      style={{ width:"100%", padding:"9px 12px", borderRadius:DS.radius.md, border:"1px solid #cbd5e1", fontSize:13, outline:"none" }}>
                      {["1","2","3","annual"].map(t => <option key={t} value={t}>Term {t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, marginBottom:5 }}>Year</label>
                    <select
                      value={invoiceForm.year}
                      onChange={e=>setInvoiceForm(f=>({...f,year:e.target.value}))}
                      style={{ width:"100%", padding:"9px 12px", borderRadius:DS.radius.md, border:"1px solid #cbd5e1", fontSize:13, outline:"none" }}>
                      {["2026","2027","2028"].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom:12 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:600, marginBottom:5 }}>Due Date</label>
                  <input
                    type="date"
                    value={invoiceForm.dueDate}
                    onChange={e=>setInvoiceForm(f=>({...f,dueDate:e.target.value}))}
                    style={{ width:"100%", padding:"9px 12px", borderRadius:DS.radius.md, border:"1px solid #cbd5e1", fontSize:13, boxSizing:"border-box", outline:"none" }} />
                </div>

                {/* Fee per grade */}
                <div style={{ fontWeight:600, fontSize:12, marginBottom:8, color:"#374151" }}>Fee Amount per Grade (TZS)</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
                  {[["Form 1","350000"],["Form 2","380000"],["Form 3","430000"],["Form 4","480000"]].map(([grade, defaultAmt]) => (
                    <div key={grade} style={{ display:"flex", alignItems:"center", gap:10, background:"#f8fafd", borderRadius:DS.radius.md, padding:"8px 12px" }}>
                      <span style={{ fontSize:12, fontWeight:700, color:rc.bg, width:60 }}>{grade}</span>
                      <span style={{ fontSize:11, color:"#64748b", flex:1 }}>{students.filter(s=>s.grade===grade).length} students</span>
                      <div style={{ position:"relative" }}>
                        <span style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", fontSize:11, color:"#64748b" }}>TZS</span>
                        <input
                          type="number"
                          defaultValue={defaultAmt}
                          style={{ width:110, padding:"6px 8px 6px 36px", borderRadius:DS.radius.sm, border:"1px solid #cbd5e1", fontSize:12, outline:"none" }}
                          id={`bulk-fee-${grade}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div style={{ background:"#f0f9ff", borderRadius:DS.radius.md, padding:12, marginBottom:16, fontSize:12 }}>
                  <div style={{ fontWeight:700, color:"#0369a1", marginBottom:6 }}>📋 Preview</div>
                  <div style={{ color:"#374151", lineHeight:1.8 }}>
                    {students.map(s => (
                      <div key={s.id} style={{ display:"flex", justifyContent:"space-between" }}>
                        <span>{s.name} ({s.grade})</span>
                        <span style={{ fontWeight:600, fontFamily:DS.font.mono }}>INV-{invoiceForm.year}-AZA-{s.student_no}-T{invoiceForm.term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const newInvoices = students.map(s => {
                      const feeAmounts = { "Form 1":350000, "Form 2":380000, "Form 3":430000, "Form 4":480000 };
                      const amount = feeAmounts[s.grade] || 380000;
                      return {
                        id:`inv-bulk-${s.id}-${Date.now()}`,
                        ref:`INV-${invoiceForm.year}-AZA-${s.student_no}-T${invoiceForm.term}`,
                        student_id: s.id,
                        school_id: "s1",
                        amount_tzs: amount,
                        paid_tzs: 0,
                        balance_tzs: amount,
                        status: "unpaid",
                        term: invoiceForm.term,
                        year: parseInt(invoiceForm.year),
                        due_date: invoiceForm.dueDate || "2026-09-30",
                        created_at: new Date().toISOString().split("T")[0],
                      };
                    });
                    addInvoices(newInvoices); // ← updates shared store
                    audit("BULK_INVOICE_GENERATED","invoices","success","low");
                    showToast(`✅ ${newInvoices.length} invoices generated! SMS notifications sent to all parents.`);
                  }}
                  style={{ width:"100%", padding:12, borderRadius:DS.radius.md, background:"linear-gradient(135deg,#0f2d4a,#1a4a7a)", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                  ⚡ Generate {students.length} Invoices — All Students
                </button>
              </Card>

              {/* ── BULK SMS REMINDERS ── */}
              <Card style={{ padding:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:20 }}>📱</span>
                  <div style={{ fontWeight:700, fontSize:16, color:rc.bg, fontFamily:DS.font.display }}>Bulk SMS Reminders</div>
                </div>
                <div style={{ fontSize:12, color:"#64748b", marginBottom:16 }}>Send payment reminders to all unpaid parents</div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                  {[
                    { label:"Unpaid",  count:invoices.filter(i=>i.status==="unpaid").length,  color:"#991b1b", bg:"#fee2e2"  },
                    { label:"Partial", count:invoices.filter(i=>i.status==="partial").length, color:"#854d0e", bg:"#fef9c3"  },
                  ].map(s => (
                    <div key={s.label} style={{ background:s.bg, borderRadius:DS.radius.md, padding:"12px 16px", textAlign:"center" }}>
                      <div style={{ fontSize:22, fontWeight:700, color:s.color, fontFamily:DS.font.display }}>{s.count}</div>
                      <div style={{ fontSize:11, color:"#64748b" }}>{s.label} students</div>
                    </div>
                  ))}
                </div>

                <div style={{ background:"#f8fafd", borderRadius:DS.radius.md, padding:12, marginBottom:16, fontSize:12, color:"#374151", lineHeight:1.7 }}>
                  <div style={{ fontWeight:700, marginBottom:4 }}>SMS Preview (Swahili):</div>
                  <div style={{ fontStyle:"italic", color:"#64748b" }}>
                    "EduPay 🔔: Kumbusho — mtoto wako ana baki ya ada ya TZS [amount] katika Azania Secondary. Tarehe ya mwisho: {invoiceForm.dueDate || "30/09/2026"}. Lipa sasa kupitia M-Pesa au Benki. Msaada: 0800 123 456"
                  </div>
                </div>

                <button
                  onClick={() => {
                    const unpaidCount = invoices.filter(i=>i.status==="unpaid"||i.status==="partial").length;
                    audit("BULK_SMS_REMINDERS_SENT","notifications","success","low");
                    showToast(`📱 ${unpaidCount} SMS reminders sent to parents`);
                  }}
                  style={{ width:"100%", padding:12, borderRadius:DS.radius.md, background:"#f5a623", color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer" }}>
                  📱 Send Reminders to {invoices.filter(i=>i.status==="unpaid"||i.status==="partial").length} Parents
                </button>
              </Card>

              {/* ── SINGLE INVOICE ── */}
              <Card style={{ padding:24 }}>
                <div style={{ fontWeight:700, fontSize:15, marginBottom:16, color:rc.bg, fontFamily:DS.font.display }}>Single Invoice</div>
                {[[t("studentNo"),"text","e.g. STU003","studentId"],[t("feeAmount"),"number","430000","amount"],[t("dueDate"),"date","","dueDate"]].map(([l,t,p,k]) => (
                  <div key={k} style={{ marginBottom:14 }}>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, marginBottom:5, color:"#374151" }}>{l}</label>
                    <input type={t} placeholder={p} value={invoiceForm[k]} onChange={e=>setInvoiceForm(f=>({...f,[k]:e.target.value}))} style={{ width:"100%", padding:"9px 12px", borderRadius:DS.radius.md, border:"1px solid #cbd5e1", fontSize:13, boxSizing:"border-box", outline:"none" }} />
                  </div>
                ))}
                <button onClick={createInvoice} style={{ width:"100%", padding:11, borderRadius:DS.radius.md, background:rc.bg, color:"#fff", border:"none", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                  Generate Single Invoice
                </button>
              </Card>
            </div>

            <Card style={{ overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9", fontWeight:700, color:rc.bg }}>All Invoices</div>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead><tr style={{ background:"#f8fafd" }}>
                  {["Reference","Student","Amount","Paid","Balance",t("dueDate"),"Status"].map(h => (
                    <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontSize:11, textTransform:"uppercase", letterSpacing:".04em", fontWeight:600 }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {invoices.map((inv,i) => {
                    const student = students.find(s => s.id===inv.student_id);
                    return (
                      <tr key={inv.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"#fff":"#fafcff" }}>
                        <td style={{ padding:"11px 14px", fontFamily:DS.font.mono, fontSize:11, color:"#6366f1" }}>{inv.ref}</td>
                        <td style={{ padding:"11px 14px", fontWeight:600 }}>{student?.name}</td>
                        <td style={{ padding:"11px 14px" }}>{inv.amount_tzs.toLocaleString()}</td>
                        <td style={{ padding:"11px 14px", color:"#166534", fontWeight:600 }}>{inv.paid_tzs.toLocaleString()}</td>
                        <td style={{ padding:"11px 14px", color:inv.balance_tzs>0?"#991b1b":"#166534", fontWeight:600 }}>{inv.balance_tzs.toLocaleString()}</td>
                        <td style={{ padding:"11px 14px", color:"#64748b", fontSize:12 }}>{inv.due_date}</td>
                        <td style={{ padding:"11px 14px" }}><StatusBadge status={inv.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {tab==="ledger"          && <LedgerView ledger={ledger} transactions={transactions} />}
        {tab==="reconciliation"  && <ReconciliationView transactions={transactions} invoices={invoices} students={students} />}
        {tab==="reports"         && <ReportingView students={students} invoices={invoices} transactions={transactions} />}
        {tab==="audit"           && <AuditView auditLog={auditLog} />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// BANK DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function BankDashboard() {
  const { user, logout, audit, auditLog } = useAuth();
  const { transactions, setTransactions, invoices, ledger } = useData();
  const { t } = useLang();
  const [tab, setTab]     = useState("transactions");
  const [toast, setToast] = useState(null);
  const rc = DS.color.bank;

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  const approve = (id) => {
    setTransactions(t => t.map(x => x.id===id ? {...x, status:"success", settled:false} : x));
    audit("TRANSACTION_APPROVED","transactions","success","medium");
    showToast("Transaction approved and ledger updated");
  };

  const cleared = transactions.filter(t => t.status==="success").reduce((a,b) => a+b.amount_tzs, 0);
  const pending = transactions.filter(t => t.status==="pending").reduce((a,b)  => a+b.amount_tzs, 0);

  const tabs = [["transactions","Transactions"],["ledger","Ledger"],["reconciliation","Reconciliation"],["reports","Reports"],["audit","Audit"]];

  return (
    <div style={{ minHeight:"100vh", background:rc.light, fontFamily:DS.font.body }}>
      <style>{css}</style>
      <FontLoader />
      {toast && <Toast {...toast} />}
      <Topbar role="bank" user={user} onLogout={logout} activeTab={tab} setTab={setTab} tabs={tabs} />

      <div style={{ padding:"28px 28px 40px" }}>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:24, fontWeight:900, fontFamily:DS.font.display, color:rc.bg }}>Welcome, {user?.name} 👋</div>
          <div style={{ fontSize:13, color:"#64748b", marginTop:2 }}>Education Payments Division · May 2026</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
          <StatCard icon="🔄" label={t("transactions")}    value={transactions.length}              sub={t("thisMonth")}        accent={rc.accent} index={0} />
          <StatCard icon="✅" label={t("collected")}         value={cleared.toLocaleString()}         sub={t("processed")}        accent={rc.accent} index={1} />
          <StatCard icon="🕐" label={t("outstanding")}       value={pending.toLocaleString()}         sub={t("awaitingApproval")} accent={rc.accent} index={2} />
          <StatCard icon="🏫" label={t("schoolsConnected")}  value="12"                               sub={t("onPilot")}          accent={rc.accent} index={3} />
        </div>

        {tab==="transactions" && (
          <Card style={{ overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid #d1fae5", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontWeight:700, color:rc.bg }}>Transaction Log</span>
              <div style={{ display:"flex", gap:8 }}>
                <button style={{ padding:"6px 14px", borderRadius:DS.radius.md, background:rc.accent, border:"none", color:rc.bg, fontSize:12, fontWeight:700, cursor:"pointer" }}>Export CSV</button>
                <button style={{ padding:"6px 14px", borderRadius:DS.radius.md, background:"transparent", border:`1px solid ${rc.bg}`, color:rc.bg, fontSize:12, cursor:"pointer" }}>Export PDF</button>
              </div>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead><tr style={{ background:"#f0fdf6" }}>
                {[t("refNo"),t("student"),t("amount"),t("method"),t("phone"),t("date"),t("riskScore"),t("flags"),t("status"),t("action")].map(h => (
                  <th key={h} style={{ padding:"10px 12px", textAlign:"left", color:"#64748b", fontSize:11, textTransform:"uppercase", letterSpacing:".04em", fontWeight:600 }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {transactions.map((txn,i) => {
                  const student = initStudents.find(s => s.id===txn.student_id);
                  return (
                    <tr key={txn.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"#fff":"#f9fefb" }}>
                      <td style={{ padding:"11px 12px", fontFamily:DS.font.mono, color:"#6366f1", fontSize:11 }}>{txn.ref}</td>
                      <td style={{ padding:"11px 12px", fontWeight:600 }}>{student?.name}</td>
                      <td style={{ padding:"11px 12px", fontWeight:700 }}>{txn.amount_tzs.toLocaleString()}</td>
                      <td style={{ padding:"11px 12px" }}><MethodBadge method={txn.method} /></td>
                      <td style={{ padding:"11px 12px", fontFamily:DS.font.mono, color:"#64748b", fontSize:11 }}>{txn.phone}</td>
                      <td style={{ padding:"11px 12px", color:"#64748b", fontSize:12 }}>{txn.date}</td>
                      <td style={{ padding:"11px 12px" }}>
                        <span style={{ background:txn.risk_score>50?"#fee2e2":txn.risk_score>20?"#fef9c3":"#dcfce7", color:txn.risk_score>50?"#991b1b":txn.risk_score>20?"#854d0e":"#166534", borderRadius:DS.radius.full, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{txn.risk_score}</span>
                      </td>
                      <td style={{ padding:"11px 12px" }}>
                        {txn.risk_flags.map(f => <span key={f} style={{ background:"#fce7f3", color:"#9d174d", borderRadius:DS.radius.full, padding:"1px 7px", fontSize:10, fontWeight:600, marginRight:3 }}>{f}</span>)}
                        {txn.risk_flags.length===0 && <span style={{ color:"#94a3b8", fontSize:11 }}>{t("noFlags")}</span>}
                      </td>
                      <td style={{ padding:"11px 12px" }}><StatusBadge status={txn.status} /></td>
                      <td style={{ padding:"11px 12px" }}>
                        {txn.status==="pending" && <button onClick={()=>approve(txn.id)} style={{ padding:"4px 10px", borderRadius:DS.radius.sm, background:rc.accent, border:"none", color:rc.bg, fontSize:11, cursor:"pointer", fontWeight:700 }}>{t("approve")}</button>}
                        {txn.status==="success" && <button style={{ padding:"4px 10px", borderRadius:DS.radius.sm, border:`1px solid ${rc.bg}`, background:"transparent", color:rc.bg, fontSize:11, cursor:"pointer" }}>{t("receipt")}</button>}
                        {txn.status==="failed"  && <span style={{ fontSize:11, color:"#991b1b", fontWeight:600 }}>{t("blocked")}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}

        {tab==="ledger"         && <LedgerView ledger={ledger} transactions={transactions} />}
        {tab==="reconciliation" && <ReconciliationView transactions={transactions} invoices={invoices} students={initStudents} />}
        {tab==="reports"        && <ReportingView students={initStudents} invoices={invoices} transactions={transactions} />}
        {tab==="audit"          && <AuditView auditLog={auditLog} />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PARENT PORTAL
// ══════════════════════════════════════════════════════════════════════════════
function ParentPortal() {
  const { user, logout, audit } = useAuth();
  const { invoices, processPayment } = useData();
  const { t } = useLang();
  const [step, setStep]     = useState(1);
  const [studentId, setStudentId] = useState("");
  const [found, setFound]   = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [method, setMethod] = useState(null);
  const [phone, setPhone]   = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txRef]             = useState("EDP-2026-"+Math.random().toString(36).substring(2,8).toUpperCase());
  const rc = DS.color.parent;

  const lookup = () => {
    const s = initStudents.find(x => x.student_no.toLowerCase()===studentId.trim().toLowerCase());
    if (s) {
      // Always get latest invoice from shared store
      const inv = invoices.find(v => v.student_id===s.id);
      setFound(s); setInvoice(inv);
      setAmount(String(inv?.balance_tzs || 0));
      setStep(2);
      audit("STUDENT_LOOKUP","students");
    } else alert("Student not found. Try STU002 or STU003.");
  };

  const confirm = () => {
    setLoading(true);
    audit("PAYMENT_INITIATED","payments","success","low");
    setTimeout(() => {
      // ── This is the key line — updates ALL dashboards instantly ──
      processPayment({
        invoiceId:  invoice.id,
        amountTzs:  parseInt(amount),
        method:     method.id,
        payerPhone: phone,
        txRef,
      });
      setLoading(false);
      setStep(4);
    }, 2500);
  };

  // Payment methods — mobile money + banks
  const mobileMethods = [
    { id:"mpesa",    label:"M-Pesa",    color:DS.color.mpesa,  prefix:"0712/0742", logo:"📱", type:"mobile" },
    { id:"tigo_pesa",label:"Tigo Pesa", color:DS.color.tigo,   prefix:"0652/0653", logo:"📲", type:"mobile" },
    { id:"airtel",   label:"Airtel",    color:DS.color.airtel, prefix:"0683/0685", logo:"📡", type:"mobile" },
    { id:"halopesa", label:"HaloPesa",  color:DS.color.halo,   prefix:"0621/0622", logo:"💜", type:"mobile" },
  ];
  const bankMethods = [
    { id:"crdb",  label:"CRDB SimBanking", color:DS.color.crdb,  logo:"🏦", type:"bank", limit:"noLimit" },
    { id:"nmb",   label:"NMB Mobile",      color:DS.color.nmb,   logo:"🏦", type:"bank", limit:"noLimit" },
    { id:"amana", label:"Amana Bank",      color:DS.color.amana, logo:"🏦", type:"bank", limit:"noLimit" },
  ];

  const steps = ["Find Student","Payment Method","Confirm","Done"];

  return (
    <div style={{ minHeight:"100vh", background:rc.light, fontFamily:DS.font.body }}>
      <style>{css}</style>
      <FontLoader />
      <Topbar role="parent" user={user} onLogout={logout} activeTab="" setTab={()=>{}} tabs={[]} />

      <div style={{ maxWidth:580, margin:"40px auto", padding:"0 16px" }}>
        {/* Progress steps */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:32 }}>
          {steps.map((s,i) => (
            <div key={s} style={{ display:"flex", alignItems:"center", flex:1 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:"0 0 auto" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:step>i?"#1e1148":step===i+1?rc.accent:"#e2e8f0", color:step>i||step===i+1?"#fff":"#94a3b8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>{step>i+1?"✓":i+1}</div>
                <div style={{ fontSize:10, color:"#64748b", marginTop:4, whiteSpace:"nowrap" }}>{s}</div>
              </div>
              {i<steps.length-1 && <div style={{ flex:1, height:2, background:step>i+1?"#1e1148":"#e2e8f0", margin:"0 4px", marginBottom:14 }} />}
            </div>
          ))}
        </div>

        <Card style={{ padding:32 }}>
          {step===1 && <>
            <div style={{ fontWeight:900, fontSize:22, marginBottom:6, fontFamily:DS.font.display }}>{t("findChild")}</div>
            <div style={{ color:"#64748b", fontSize:14, marginBottom:24 }}>{t("findChildDesc")}</div>
            <label style={{ fontSize:12, fontWeight:600, display:"block", marginBottom:6 }}>{t("studentId")}</label>
            <input value={studentId} onChange={e=>setStudentId(e.target.value)} onKeyDown={e=>e.key==="Enter"&&lookup()} placeholder="e.g. STU002"
              style={{ width:"100%", padding:"12px 14px", borderRadius:DS.radius.md, border:"1.5px solid #cbd5e1", fontSize:15, boxSizing:"border-box", outline:"none", marginBottom:20 }} />
            <button onClick={lookup} style={{ width:"100%", padding:13, borderRadius:DS.radius.md, background:rc.bg, color:"#fff", border:"none", fontSize:15, fontWeight:700, cursor:"pointer" }}>{t("findStudent")}</button>
          </>}

          {step===2 && found && invoice && <>
            {/* Student info */}
            <div style={{ background:rc.light, borderRadius:DS.radius.md, padding:16, marginBottom:24 }}>
              <div style={{ fontWeight:700, fontSize:16 }}>{found.name}</div>
              <div style={{ color:"#64748b", fontSize:13, marginBottom:10 }}>{found.grade} · {found.student_no}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                {[["Total",invoice.amount_tzs,"#374151"],["Paid",invoice.paid_tzs,"#166534"],["Balance",invoice.balance_tzs,"#991b1b"]].map(([l,v,c]) => (
                  <div key={l} style={{ textAlign:"center", background:"#fff", borderRadius:DS.radius.md, padding:"10px 8px" }}>
                    <div style={{ fontSize:15, fontWeight:700, color:c }}>TZS {Number(v).toLocaleString()}</div>
                    <div style={{ fontSize:11, color:"#64748b" }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:10, fontSize:11, color:"#6366f1", fontFamily:DS.font.mono }}>Ref: {invoice.ref}</div>
            </div>

            {/* Mobile money */}
            <div style={{ fontWeight:700, fontSize:14, marginBottom:10, color:"#374151" }}>{t("mobileMoneyTitle")}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
              {mobileMethods.map(m => (
                <button key={m.id} onClick={()=>setMethod(m)} style={{ padding:"12px 10px", borderRadius:DS.radius.md, border:method?.id===m.id?`2.5px solid ${m.color}`:"1.5px solid #e2e8f0", background:method?.id===m.id?`${m.color}15`:"#fff", cursor:"pointer", textAlign:"left" }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>{m.logo}</div>
                  <div style={{ fontWeight:700, fontSize:13, color:m.color }}>{m.label}</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>{m.prefix}</div>
                </button>
              ))}
            </div>

            {/* Bank apps */}
            <div style={{ fontWeight:700, fontSize:14, marginBottom:10, color:"#374151" }}>{t("bankAppsTitle")}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
              {bankMethods.map(m => (
                <button key={m.id} onClick={()=>setMethod(m)} style={{ padding:"12px 10px", borderRadius:DS.radius.md, border:method?.id===m.id?`2.5px solid ${m.color}`:"1.5px solid #e2e8f0", background:method?.id===m.id?`${m.color}15`:"#fff", cursor:"pointer", textAlign:"left" }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>{m.logo}</div>
                  <div style={{ fontWeight:700, fontSize:12, color:m.color }}>{m.label}</div>
                  <div style={{ fontSize:10, color:"#22c55e", fontWeight:600 }}>{m.limit}</div>
                </button>
              ))}
            </div>

            {/* Phone for mobile money */}
            {method?.type==="mobile" && <>
              <label style={{ fontSize:12, fontWeight:600, display:"block", marginBottom:6 }}>Phone Number</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="e.g. 0712345678"
                style={{ width:"100%", padding:"11px 14px", borderRadius:DS.radius.md, border:"1.5px solid #cbd5e1", fontSize:15, boxSizing:"border-box", outline:"none", marginBottom:14 }} />
            </>}

            {/* Bank instructions */}
            {method?.type==="bank" && (
              <div style={{ background:"#f0f9ff", borderRadius:DS.radius.md, padding:14, marginBottom:14, fontSize:13 }}>
                <div style={{ fontWeight:700, marginBottom:6 }}>How to pay via {method.label}:</div>
                <div style={{ color:"#0369a1", lineHeight:1.8 }}>
                  1. Open your {method.label} app<br/>
                  2. Go to <strong>Transfer / Pay Bills</strong><br/>
                  3. Account: <strong style={{ fontFamily:DS.font.mono }}>EduPay — 0150 1234 56789</strong><br/>
                  4. Reference: <strong style={{ fontFamily:DS.font.mono }}>{invoice.ref}</strong><br/>
                  5. Amount: <strong>TZS {Number(amount).toLocaleString()}</strong>
                </div>
              </div>
            )}

            <label style={{ fontSize:12, fontWeight:600, display:"block", marginBottom:6 }}>Amount (TZS)</label>
            <input value={amount} onChange={e=>setAmount(e.target.value)} type="number"
              style={{ width:"100%", padding:"11px 14px", borderRadius:DS.radius.md, border:"1.5px solid #cbd5e1", fontSize:15, boxSizing:"border-box", outline:"none", marginBottom:20 }} />

            <button onClick={()=>{ if(!method)return alert("Select a payment method"); if(method.type==="mobile"&&!phone)return alert("Enter phone number"); setStep(3); }}
              style={{ width:"100%", padding:13, borderRadius:DS.radius.md, background:rc.bg, color:"#fff", border:"none", fontSize:15, fontWeight:700, cursor:"pointer" }}>Continue →</button>
          </>}

          {step===3 && <>
            <div style={{ fontWeight:900, fontSize:20, marginBottom:20, fontFamily:DS.font.display }}>Confirm Payment</div>
            {[["Student",found?.name],["Grade",found?.grade],["Invoice Ref",invoice?.ref],["Amount",`TZS ${Number(amount).toLocaleString()}`],["Method",method?.label],["Phone/Bank",method?.type==="mobile"?phone:"Bank Transfer"],[t("eduPayRef"),txRef]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #f1f5f9", fontSize:14 }}>
                <span style={{ color:"#64748b" }}>{k}</span>
                <span style={{ fontWeight:700, fontFamily:k==="Invoice Ref"||k===t("eduPayRef")?DS.font.mono:DS.font.body, fontSize:k==="Invoice Ref"||k===t("eduPayRef")?12:14 }}>{v}</span>
              </div>
            ))}
            <div style={{ background:"#fef9c3", borderRadius:DS.radius.md, padding:12, marginTop:16, fontSize:13, color:"#854d0e" }}>
              ⚠️ {method?.type==="mobile" ? `You will receive a ${method?.label} push notification to approve.` : `Complete the transfer in your ${method?.label} app using the reference above.`}
            </div>
            <button onClick={confirm} disabled={loading} style={{ width:"100%", padding:13, borderRadius:DS.radius.md, background:loading?"#94a3b8":method?.color, color:"#fff", border:"none", fontSize:15, fontWeight:700, cursor:loading?"not-allowed":"pointer", marginTop:20, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {loading ? <><span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />Processing…</> : `Confirm Payment via ${method?.label}`}
            </button>
          </>}

          {step===4 && (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:64, marginBottom:16 }}>✅</div>
              <div style={{ fontWeight:900, fontSize:22, marginBottom:8, fontFamily:DS.font.display }}>Payment Successful!</div>
              <div style={{ color:"#64748b", fontSize:14, marginBottom:20 }}>
                {method?.type==="mobile" ? "SMS receipt sent to your phone. School has been notified." : "Bank transfer recorded. School will be notified upon confirmation."}
              </div>
              {/* Receipt */}
              <div style={{ background:"#f8fafd", borderRadius:DS.radius.lg, padding:20, textAlign:"left", marginBottom:24, border:"1px solid #e2e8f0" }}>
                <div style={{ textAlign:"center", fontWeight:900, fontSize:16, fontFamily:DS.font.display, marginBottom:4 }}>EduPay Connect</div>
                <div style={{ textAlign:"center", fontSize:12, color:"#64748b", marginBottom:16 }}>OFFICIAL RECEIPT</div>
                {[[t("receiptNo"),"RCP-2026-EDP-00"+Math.floor(Math.random()*999)],["Student",found?.name],["Grade",found?.grade],["School","Azania Secondary"],[t("amountPaid"),`TZS ${Number(amount).toLocaleString()}`],[t("paymentVia"),method?.label],[t("eduPayRef"),txRef],["Date",new Date().toLocaleDateString()]].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px dashed #e2e8f0", fontSize:12 }}>
                    <span style={{ color:"#64748b" }}>{k}</span>
                    <span style={{ fontWeight:600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ textAlign:"center", marginTop:12, fontSize:10, color:"#94a3b8" }}>Computer generated receipt · edupay.co.tz</div>
              </div>
              <button onClick={()=>{setStep(1);setFound(null);setInvoice(null);setStudentId("");setMethod(null);setPhone("");}}
                style={{ padding:"10px 28px", borderRadius:DS.radius.md, background:rc.bg, color:"#fff", border:"none", fontSize:14, fontWeight:700, cursor:"pointer" }}>Make Another Payment</button>
            </div>
          )}
        </Card>
        <div style={{ textAlign:"center", marginTop:16, fontSize:11, color:"#94a3b8" }}>🔒 256-bit encrypted · EduPay Connect · edupay.co.tz</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function LoginScreen() {
  const { login } = useAuth();
  const { t, lang, toggleLang } = useLang();
  const [selectedRole, setRole] = useState(null);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);
  const [mounted, setMounted]   = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const ROLES = {
    school_admin: { label:"schoolAdmin", icon:"🏫", color:"#f5a623", desc:"schoolAdminDesc" },
    bank_officer: { label:"bankOfficer", icon:"🏦", color:"#27c97e", desc:"bankOfficerDesc" },
    parent:       { label:"parentGuardian", icon:"👨‍👩‍👧", color:"#a78bfa", desc:"parentDesc" },
  };

  const DEMO = [
    ["🏫","bursar@azania.ac.tz","school123","school_admin","School Admin"],
    ["🏦","amina@crdb.co.tz","bank123","bank_officer","Bank Officer"],
    ["👨‍👩‍👧","juma@gmail.com","parent123","parent","Parent"],
  ];

  const r = selectedRole ? ROLES[selectedRole] : null;

  const handleLogin = async () => {
    if (!selectedRole) return setError("Please select your role.");
    if (!email || !password) return setError("Fill in all fields.");
    setLoading(true); setError("");
    try { await login(email, password, selectedRole); }
    catch { setLoading(false); setError("Invalid credentials."); setShake(true); setTimeout(()=>setShake(false),600); }
  };

  const quickLogin = async (em, pw, role) => {
    setEmail(em); setPassword(pw); setRole(role); setError(""); setLoading(true);
    try { await login(em, pw, role); }
    catch { setLoading(false); setError("Demo login failed."); }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:DS.font.body, background:"linear-gradient(145deg,#080f1a 0%,#0c2a1c 55%,#150d30 100%)" }}>
      <style>{css+`input::placeholder{color:rgba(255,255,255,.25)}`}</style>
      <FontLoader />

      {/* Left */}
      <div style={{ flex:"0 0 380px", display:"flex", flexDirection:"column", justifyContent:"center", padding:"48px 40px", opacity:mounted?1:0, transform:mounted?"translateX(0)":"translateX(-24px)", transition:"all .6s ease" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:40 }}>
          <div style={{ width:38, height:38, borderRadius:DS.radius.md, background:"linear-gradient(135deg,#f5a623,#e8850a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>💳</div>
          <div style={{ flex:1 }}>
            <div style={{ color:"#fff", fontWeight:900, fontSize:17, fontFamily:DS.font.display }}>EduPay Connect</div>
            <div style={{ color:"rgba(255,255,255,.4)", fontSize:10, letterSpacing:".1em" }}>TANZANIA · SCHOOL FEE PLATFORM</div>
          </div>
          {/* Language toggle on login screen */}
          <button onClick={toggleLang} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:DS.radius.full, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"#fff", cursor:"pointer", fontSize:11, fontWeight:600 }}>
            <span>{lang==="en"?"🇹🇿":"🇬🇧"}</span>
            <span>{lang==="en"?"SW":"EN"}</span>
          </button>
        </div>

        <div style={{ color:"rgba(255,255,255,.4)", fontSize:10, letterSpacing:".15em", textTransform:"uppercase", marginBottom:8 }}>{t("selectRoleDesc")}</div>
        <div style={{ color:"#fff", fontSize:20, fontWeight:700, fontFamily:DS.font.display, marginBottom:20, lineHeight:1.2 }}>{t("selectRole")}</div>

        <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
          {Object.entries(ROLES).map(([key,val],i) => (
            <button key={key} onClick={()=>{setRole(key);setError("");}} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 13px", borderRadius:DS.radius.md, border:selectedRole===key?`2px solid ${val.color}`:"1.5px solid rgba(255,255,255,.1)", background:selectedRole===key?`${val.color}18`:"rgba(255,255,255,.04)", cursor:"pointer", textAlign:"left", color:"#fff", opacity:mounted?1:0, transform:mounted?"translateX(0)":"translateX(-16px)", transition:`all .4s ease ${i*.08}s` }}>
              <div style={{ width:34, height:34, borderRadius:DS.radius.sm, background:selectedRole===key?`${val.color}30`:"rgba(255,255,255,.07)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{val.icon}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:13, color:selectedRole===key?val.color:"#fff" }}>{val.label}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.4)" }}>{val.desc}</div>
              </div>
              {selectedRole===key && <div style={{ marginLeft:"auto", width:7, height:7, borderRadius:"50%", background:val.color }} />}
            </button>
          ))}
        </div>

        {/* Quick demo login */}
        <div style={{ padding:"14px 16px", borderRadius:DS.radius.md, background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)" }}>
          <div style={{ color:"rgba(255,255,255,.45)", fontSize:10, marginBottom:10, letterSpacing:".1em", textTransform:"uppercase" }}>{t("quickDemo")}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {DEMO.map(([icon,em,pw,role,label]) => (
              <button key={em} onClick={()=>quickLogin(em,pw,role)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", textAlign:"left", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.08)", borderRadius:DS.radius.sm, cursor:"pointer", color:"rgba(255,255,255,.8)", fontSize:12, padding:"8px 10px", transition:"background .15s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.12)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.06)"}>
                <span style={{ fontSize:15 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:12 }}>{label}</div>
                  <div style={{ fontSize:10, opacity:.6, fontFamily:DS.font.mono }}>{em}</div>
                </div>
                <span style={{ marginLeft:"auto", fontSize:10, opacity:.4 }}>{t("clickToLogin")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:32, opacity:mounted?1:0, transition:"all .6s ease .1s" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          <div style={{ color:"rgba(255,255,255,.25)", fontSize:10, letterSpacing:".15em", textTransform:"uppercase", marginBottom:8 }}>EduPay Connect v2.0</div>
          <div style={{ color:"#fff", fontSize:30, fontWeight:900, fontFamily:DS.font.display, marginBottom:6 }}>
            {lang==="en" ? <>Secure. Fast.<br/>Trusted.</> : <>Salama. Haraka.<br/>Inayoaminiwa.</>}
          </div>
          <div style={{ color:"rgba(255,255,255,.4)", fontSize:13, marginBottom:32, lineHeight:1.6 }}>
            {lang==="en" ? "Tanzania's school fee payment platform. Double-entry ledger, full reconciliation, M-Pesa + CRDB + NMB integration." : "Jukwaa la malipo ya ada za shule Tanzania. Daftari la kuingiza mara mbili, ulinganisho kamili, M-Pesa + CRDB + NMB."}
          </div>

          <div style={{ background:"rgba(255,255,255,.06)", backdropFilter:"blur(20px)", borderRadius:DS.radius.xl, padding:"28px 24px", border:r?`1.5px solid ${r.color}40`:"1.5px solid rgba(255,255,255,.1)", animation:shake?"shake .5s ease":"none" }}>
            <div style={{ fontWeight:900, fontSize:17, color:"#fff", marginBottom:4, fontFamily:DS.font.display }}>{r?`${t("signInAs")} ${r.label}`:t("signIn")}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,.4)", marginBottom:22 }}>{r?r.desc:"selectRoleDesc"}</div>

            {["email","password"].map(field => (
              <div key={field} style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:11, fontWeight:600, color:"rgba(255,255,255,.45)", marginBottom:5, textTransform:"uppercase", letterSpacing:".05em" }}>{field==="email"?t("email"):t("password")}</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13 }}>{field==="email"?"✉️":"🔒"}</span>
                  <input
                    type={field==="password"?(showPass?"text":"password"):"email"}
                    value={field==="email"?email:password}
                    onChange={e=>field==="email"?setEmail(e.target.value):setPassword(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                    placeholder={field==="email"?t("emailPlaceholder"):t("passwordPlaceholder")}
                    style={{ width:"100%", padding:"11px 38px", borderRadius:DS.radius.md, border:"1.5px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.07)", color:"#fff", fontSize:14, boxSizing:"border-box", outline:"none" }} />
                  {field==="password" && <button onClick={()=>setShowPass(!showPass)} style={{ position:"absolute", right:11, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:13 }}>{showPass?"🙈":"👁️"}</button>}
                </div>
              </div>
            ))}

            {error && <div style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", borderRadius:DS.radius.md, padding:"8px 12px", color:"#fca5a5", fontSize:12, marginBottom:14 }}>⚠️ {error}</div>}

            <button onClick={handleLogin} disabled={loading} style={{ width:"100%", padding:12, borderRadius:DS.radius.md, border:"none", cursor:loading?"not-allowed":"pointer", fontSize:14, fontWeight:700, background:r?`linear-gradient(135deg,${r.color},${r.color}cc)`:"linear-gradient(135deg,#f5a623,#e8850a)", color:"#0a0a0a", opacity:loading?.7:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:4 }}>
              {loading?<><span style={{ width:15, height:15, border:"2px solid rgba(0,0,0,.2)", borderTopColor:"#000", borderRadius:"50%", animation:"spin .7s linear infinite", display:"inline-block" }} />{t("verifying")}</>:`${t("signIn")}${r?` ${t("signInAs")} ${r.label}`:""}`}
            </button>
          </div>
          <div style={{ textAlign:"center", marginTop:14, fontSize:10, color:"rgba(255,255,255,.2)" }}>🔒 {t("encrypted")}</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP ROUTER
// ══════════════════════════════════════════════════════════════════════════════
function AppRouter() {
  const { user } = useAuth();
  if (!user) return <LoginScreen />;
  if (user.role==="school_admin") return <SchoolDashboard />;
  if (user.role==="bank_officer") return <BankDashboard />;
  if (user.role==="parent")       return <ParentPortal />;
  return null;
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <DataProvider>
          <AppRouter />
        </DataProvider>
      </AuthProvider>
    </LangProvider>
  );
}
