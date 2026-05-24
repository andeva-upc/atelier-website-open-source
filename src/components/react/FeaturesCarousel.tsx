import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconGauge, 
  IconCalendarEvent, 
  IconClipboardCheck, 
  IconReceipt, 
  IconPackage, 
  IconSparkles,
  IconArrowRight,
  IconChevronDown,
  IconAlertTriangle,
  IconCheck,
  IconPlus,
  IconRobot,
  IconInfoCircle,
  IconPhoto
} from '@tabler/icons-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  themeColor: string; // Tailwind class for text / accent
  bgColor: string;    // Tailwind class for active card background
  accentColor: string;// HEX code
  image: string;      // Expected path to real dashboard image
}

const features: Feature[] = [
  {
    id: 'telemetria',
    title: 'Telemetría en Vivo',
    description: 'Monitorea presión de aceite, revoluciones y sensores del motor en tiempo real. Detecta y traduce códigos de falla (DTC) antes de que causen daños mayores.',
    icon: IconGauge,
    themeColor: 'text-[#0071eb]',
    bgColor: 'bg-[#B3D4F8]/20',
    accentColor: '#0071eb',
    image: '/images/features/telemetria.png',
  },
  {
    id: 'agenda',
    title: 'Citas & Agenda',
    description: 'Agenda turnos de mantenimiento sin fricción. Asigna mecánicos a bahías de trabajo automáticamente y mantén informados a tus clientes vía WhatsApp y SMS.',
    icon: IconCalendarEvent,
    themeColor: 'text-[#7C3AED]',
    bgColor: 'bg-[#F3EEFF]/25',
    accentColor: '#7C3AED',
    image: '/images/features/agenda.png',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Digital',
    description: 'Crea hojas de inspección con fotos y notas técnicas en segundos. Genera un historial clínico digital completo de cada vehículo para generar confianza.',
    icon: IconClipboardCheck,
    themeColor: 'text-[#0D9488]',
    bgColor: 'bg-[#E6F9F6]/25',
    accentColor: '#0D9488',
    image: '/images/features/mantenimiento.png',
  },
  {
    id: 'finanzas',
    title: 'Facturas & Presupuestos',
    description: 'Genera presupuestos precisos basados en mano de obra y repuestos. Conviértelos en facturas electrónicas con un clic y gestiona cuentas por cobrar.',
    icon: IconReceipt,
    themeColor: 'text-[#16A34A]',
    bgColor: 'bg-[#EEF9F0]/25',
    accentColor: '#16A34A',
    image: '/images/features/finanzas.png',
  },
  {
    id: 'inventario',
    title: 'Inventario Inteligente',
    description: 'Controla repuestos y consumibles con alertas automáticas de bajo stock. Envía órdenes de compra inteligentes a tus proveedores antes de quedarte en cero.',
    icon: IconPackage,
    themeColor: 'text-[#EA580C]',
    bgColor: 'bg-[#FFF3EB]/30',
    accentColor: '#EA580C',
    image: '/images/features/inventario.png',
  },
  {
    id: 'asistente',
    title: 'Asistente IA Mecánico',
    description: 'Consulta procedimientos guiados de reparación, diagramas sugeridos y números de parte. Nuestra IA experta asiste a tus mecánicos en la bahía.',
    icon: IconSparkles,
    themeColor: 'text-[#DB2777]',
    bgColor: 'bg-[#FFF0F5]/35',
    accentColor: '#DB2777',
    image: '/images/features/asistente.png',
  }
];

export default function FeaturesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const activeFeature = features[activeIndex];

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const nextTab = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Check if we should use the simulated mockup fallback for the active feature
  const useSimulatedFallback = imageErrors[activeFeature.id] || !activeFeature.image;

  return (
    <div className="w-full max-w-7xl mx-auto px-1 md:px-10">
      
      {/* Header section identical to tryplayground layout */}
      <div className="flex flex-col lg:flex-row md:items-start justify-between mb-6 md:mb-8 gap-6 md:gap-10">
        <div className="max-w-2xl">
          <h2 className="font-['Mona_Sans'] text-5xl md:text-6xl font-bold tracking-tight text-[#212121] mb-4">
            Conozca <span className="text-[#0071eb]">atelier</span>
          </h2>
        </div>
        <p className="font-['Arimo'] text-[#666666] text-lg md:text-[22px] max-w-2xl">
          Reemplaza múltiples hojas de Excel y herramientas obsoletas con Atelier, el único software inteligente de gestión de talleres mecánicos y telemetría.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left column: Trigger List (Ultra-Minimalist tryplayground style) */}
        <div className="lg:col-span-5 flex flex-col justify-start border-t border-b border-gray-200/60 divide-y divide-gray-200/60">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                onClick={() => handleTabClick(index)}
                className="group text-left py-6 cursor-pointer transition-all duration-300 relative select-none"
              >
                {/* Accordion header with layout shift for clean baseline */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Raw outlines icon matching the screenshot */}
                    <Icon className={`w-6 h-6 shrink-0 mt-0.5 transition-colors duration-300 ${
                      isActive ? feature.themeColor : 'text-gray-400 group-hover:text-gray-900'
                    }`} />
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className={`font-['Mona_Sans'] text-[19px] font-bold tracking-tight transition-colors ${
                        isActive ? 'text-gray-900' : 'text-gray-800 group-hover:text-black'
                      }`}>
                        {feature.title}
                      </h3>
                      
                      {/* Animated expandable description */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="font-['Arimo'] text-[#666666] text-[15px] leading-relaxed pr-4 mb-4">
                              {feature.description}
                            </p>
                            
                            {/* Minimal progress bar sitting direct under the description */}
                            <div className="h-[2px] bg-gray-150/70 rounded-full overflow-hidden w-full relative">
                              <div 
                                key={activeIndex} // This key triggers animation reset
                                onAnimationEnd={nextTab}
                                className={`h-full absolute left-0 top-0 rounded-full origin-left ${
                                  feature.id === 'telemetria' ? 'bg-[#0071eb]' :
                                  feature.id === 'agenda' ? 'bg-[#7C3AED]' :
                                  feature.id === 'mantenimiento' ? 'bg-[#0D9488]' :
                                  feature.id === 'finanzas' ? 'bg-[#16A34A]' :
                                  feature.id === 'inventario' ? 'bg-[#EA580C]' : 'bg-[#DB2777]'
                                }`}
                                style={{
                                  width: '100%',
                                  animation: 'features-progress 6s linear forwards'
                                }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Circular toggle arrow button */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shrink-0 shadow-sm ${
                    isActive 
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-gray-200 bg-white group-hover:border-gray-300 group-hover:bg-gray-50'
                  }`}>
                    <IconChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'text-gray-800 rotate-180' : 'text-gray-400 group-hover:text-gray-700'
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Interactive Visual Preview (Playground Shifted-Crop Layout for Mobile/Desktop, Centered for Tablet) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className={`w-full aspect-[4/3] lg:h-[520px] rounded-[24px] md:rounded-[32px] transition-colors duration-500 relative overflow-hidden md:p-8 md:flex md:items-center md:justify-center lg:p-0 lg:block shadow-inner ${activeFeature.bgColor}`}>
            
            {/* Background absolute graphic grid lines */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none text-slate-900">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>

            {/* Browser Mockup Container - Cropped on Mobile & Desktop, Centered & Fully Fitted on Tablet */}
            <div className="absolute left-5 top-5 w-[140%] h-[140%] md:relative md:left-0 md:top-0 md:w-full md:h-full lg:absolute lg:left-8 lg:top-8 lg:w-[125%] lg:h-[125%] bg-white rounded-tl-2xl rounded-tr-lg rounded-bl-lg md:rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden flex flex-col">
              
              {/* Simulated Browser Title Bar */}
              <div className="bg-gray-50 px-4 py-3 flex items-center border-b border-gray-150/60 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              {/* Browser body area with AnimatePresence for content transitions */}
              <div className="flex-1 overflow-hidden relative bg-gray-50/50">
                
                {/* 1. Real Image Slot (Loads if image exists and hasn't errored out) */}
                {!useSimulatedFallback && (
                  <img 
                    src={activeFeature.image} 
                    alt={activeFeature.title} 
                    onError={() => handleImageError(activeFeature.id)}
                    className="w-full h-full object-cover object-left-top select-none pointer-events-none"
                  />
                )}

                {/* 2. Simulated Dashboard Mockups (Serves as both initial visual placeholder & image error fallback) */}
                {useSimulatedFallback && (
                  <div className="w-full h-full p-4 md:p-6 font-['Arimo']">
                    
                    {/* Placeholder hint badge overlay */}
                    <div className="absolute top-2.5 right-2.5 bg-gray-900/85 hover:bg-gray-900 text-white rounded-full px-3.5 py-1 text-[10px] font-semibold flex items-center gap-1.5 shadow-md z-15 transition-all">
                      <IconPhoto className="w-3.5 h-3.5 text-[#0071eb]" />
                      <span>Reemplazar con: /public{activeFeature.image}</span>
                    </div>

                    <AnimatePresence mode="wait">
                      
                      {activeFeature.id === 'telemetria' && (
                        <motion.div
                          key="telemetria-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          {/* Top stats bar */}
                          <div className="grid grid-cols-3 gap-3 mb-4 shrink-0">
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <span className="text-gray-400 text-xs block">Presión Aceite</span>
                              <span className="text-[#0071eb] font-bold text-lg">54 PSI</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <span className="text-gray-400 text-xs block">RPM</span>
                              <span className="text-[#0071eb] font-bold text-lg">3,120</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <span className="text-gray-400 text-xs block">Temperatura</span>
                              <span className="text-[#0071eb] font-bold text-lg">92 °C</span>
                            </div>
                          </div>

                          {/* Line Chart Graphic */}
                          <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between overflow-hidden">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-bold text-gray-700">Rendimiento en Tiempo Real</h4>
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">OBD-II Conectado</span>
                            </div>
                            <div className="relative flex-1 min-h-[90px] md:min-h-[120px] flex items-end">
                              <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0071eb" stopOpacity="0.25"/>
                                    <stop offset="100%" stopColor="#0071eb" stopOpacity="0.0"/>
                                  </linearGradient>
                                </defs>
                                <motion.path 
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.8 }}
                                  d="M0 100 Q 50 40, 100 80 T 200 30 T 300 70 T 400 20 L 400 120 L 0 120 Z" 
                                  fill="url(#blue-grad)"
                                />
                                <motion.path 
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1.2, ease: 'easeOut' }}
                                  d="M0 100 Q 50 40, 100 80 T 200 30 T 300 70 T 400 20" 
                                  fill="none" 
                                  stroke="#0071eb" 
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                />
                                <circle cx="200" cy="30" r="4.5" fill="#0071eb" className="animate-ping" />
                                <circle cx="200" cy="30" r="3.5" fill="#0071eb" stroke="white" strokeWidth="1.5" />
                              </svg>
                            </div>
                          </div>

                          {/* Warning log footer */}
                          <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2 shrink-0">
                            <IconAlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                            <div className="text-xs">
                              <span className="font-bold text-red-700 block">DTC Activo Detectado</span>
                              <span className="text-red-600">P0301 (Misfire en Cilindro 1) - Revisión sugerida: Bobina</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'agenda' && (
                        <motion.div
                          key="agenda-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <h4 className="text-sm font-bold text-gray-700">Agenda - Bahía Principal</h4>
                            <div className="flex gap-2">
                              <button className="bg-[#7C3AED] text-white p-1 rounded-md text-[11px] font-bold px-2.5 flex items-center gap-1 shadow-sm">
                                <IconPlus className="w-3.5 h-3.5" />
                                Nueva Cita
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 flex-1 overflow-hidden mb-1">
                            
                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 overflow-hidden">
                              <span className="text-[10px] text-gray-400 font-bold block border-b border-gray-100 pb-1">MAÑANA</span>
                              <div className="bg-purple-50 border-l-4 border-[#7C3AED] p-2 rounded-r-lg">
                                <span className="text-[11px] font-bold text-gray-800 block truncate">Cambio Pastillas</span>
                                <span className="text-[9px] text-[#7C3AED] block truncate">09:00 AM - Honda Civ.</span>
                              </div>
                              <div className="bg-gray-50 border-l-4 border-gray-300 p-2 rounded-r-lg">
                                <span className="text-[11px] font-bold text-gray-600 block truncate">Inspección Gral</span>
                                <span className="text-[9px] text-gray-500 block truncate">11:30 AM - Ford Fi.</span>
                              </div>
                            </div>

                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 overflow-hidden">
                              <span className="text-[10px] text-gray-400 font-bold block border-b border-gray-100 pb-1">TARDE</span>
                              <div className="bg-purple-100/60 border-l-4 border-[#7C3AED] p-2 rounded-r-lg">
                                <span className="text-[11px] font-bold text-gray-800 block truncate">Alineamiento</span>
                                <span className="text-[9px] text-[#7C3AED] block truncate">02:00 PM - Audi A4</span>
                              </div>
                              <div className="border border-dashed border-gray-200 rounded-lg p-2 flex items-center justify-center h-12">
                                <span className="text-[10px] text-gray-400">Bahía Disponible</span>
                              </div>
                            </div>

                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 overflow-hidden">
                              <span className="text-[10px] text-gray-400 font-bold block border-b border-gray-100 pb-1">MECÁNICOS</span>
                              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-[9px] font-bold">CG</div>
                                <div className="overflow-hidden">
                                  <span className="text-[10px] font-bold block truncate">Carlos G.</span>
                                  <span className="text-[8px] text-green-600 block">Activo</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[9px] font-bold">LM</div>
                                <div className="overflow-hidden">
                                  <span className="text-[10px] font-bold block truncate">Lucía M.</span>
                                  <span className="text-[8px] text-green-600 block">En Bahía 2</span>
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="bg-white border border-gray-100 rounded-xl p-2.5 mt-2 flex items-center justify-between shrink-0 shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-xs text-gray-500">Notificación automática enviada a Honda Civic</span>
                            </div>
                            <span className="text-[9px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">WhatsApp SMS</span>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'mantenimiento' && (
                        <motion.div
                          key="mantenimiento-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <div>
                              <h4 className="text-sm font-bold text-gray-700">Hoja de Inspección Digital</h4>
                              <span className="text-[10px] text-gray-400">Porsche 911 Carrera S - 2021</span>
                            </div>
                            <div className="bg-teal-50 border border-teal-100 rounded-full px-3 py-1 flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-[9px] font-bold">88%</div>
                              <span className="text-[10px] text-[#0D9488] font-bold">Salud General</span>
                            </div>
                          </div>

                          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 overflow-y-auto">
                            
                            <div className="flex items-center justify-between border-b border-gray-50 pb-2.5">
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                  <IconCheck className="w-3.5 h-3.5 text-green-600" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">Nivel de Líquido de Frenos</span>
                              </div>
                              <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2.5 py-0.5 rounded-full">Aprobado</span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-50 pb-2.5">
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                                  <IconAlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">Pastillas de Freno (Delanteras)</span>
                              </div>
                              <span className="text-[10px] bg-yellow-50 text-yellow-700 font-bold px-2.5 py-0.5 rounded-full">Desgaste 15% - Sugerir cambio</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                  <IconCheck className="w-3.5 h-3.5 text-green-600" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">Filtro de Aire Motor</span>
                              </div>
                              <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2.5 py-0.5 rounded-full">Limpio</span>
                            </div>

                          </div>

                          <div className="bg-[#E6F9F6] rounded-xl p-3 border border-teal-100 flex items-center gap-2 mt-3 shrink-0">
                            <IconInfoCircle className="w-5 h-5 text-[#0D9488] shrink-0" />
                            <p className="text-[10.5px] text-[#0A6B62] leading-tight">
                              El reporte incluye 2 fotos del desgaste de balatas delanteras. El cliente puede autorizar el cambio digitalmente desde el reporte de su teléfono.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'finanzas' && (
                        <motion.div
                          key="finanzas-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <h4 className="text-sm font-bold text-gray-700">Factura FAC-2026-084</h4>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">Enviado</span>
                          </div>

                          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
                            
                            <div className="flex justify-between border-b border-gray-100 pb-3 mb-2 text-xs">
                              <div>
                                <span className="text-gray-400 block text-[9px] uppercase font-bold">Cliente</span>
                                <span className="font-bold text-gray-700">Eduardo Torres</span>
                                <span className="text-gray-500 block text-[10px]">Mazda CX-5 (2020)</span>
                              </div>
                              <div className="text-right">
                                <span className="text-gray-400 block text-[9px] uppercase font-bold">Fecha</span>
                                <span className="text-gray-700">23 Mayo, 2026</span>
                                <span className="text-gray-500 block text-[10px]">Atendido por: Lucía M.</span>
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">Pastillas de Freno delanteras Brembo</span>
                                <span className="font-bold text-gray-800">$85.00</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">Mano de Obra - Instalación</span>
                                <span className="font-bold text-gray-800">$45.00</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600">Filtro de Aceite sintético Fram</span>
                                <span className="font-bold text-gray-800">$18.00</span>
                              </div>
                            </div>

                            <div className="border-t border-gray-100 pt-3 mt-2 flex justify-between items-end">
                              <div>
                                <span className="text-[10px] text-gray-400 block">Plataforma de Pago</span>
                                <span className="text-[10px] text-gray-600 font-bold bg-gray-100 px-2 py-0.5 rounded">Stripe Tarjeta / SPEI</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-gray-400 block">Total Factura</span>
                                <span className="text-lg font-bold text-[#16A34A]">$148.00 USD</span>
                              </div>
                            </div>

                          </div>

                          <div className="mt-3 flex items-center justify-between bg-green-50 p-2.5 border border-green-100 rounded-xl shrink-0">
                            <div className="flex items-center gap-1.5 text-xs text-[#16A34A]">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              <span>Link de pago activo</span>
                            </div>
                            <button className="bg-[#16A34A] hover:bg-[#12823b] text-white font-bold py-1 px-3.5 rounded-lg text-xs shadow-sm transition-all">
                              Ver Cobro Online
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'inventario' && (
                        <motion.div
                          key="inventario-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0">
                            <h4 className="text-sm font-bold text-gray-700">Stock & Alertas de Repuestos</h4>
                            <span className="text-xs text-[#EA580C] bg-orange-50 border border-orange-100 px-2 py-0.5 rounded font-bold">2 Alertas Activas</span>
                          </div>

                          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3.5 overflow-hidden">
                            
                            <div className="flex flex-col gap-1 pb-2 border-b border-gray-50">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700">Aceite Sintético Mobil 1 5W-30</span>
                                <span className="text-[#EA580C] font-extrabold text-xs">CRÍTICO (2 u.)</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-[#EA580C] h-full w-[12%] rounded-full"></div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 pb-2 border-b border-gray-50">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700">Filtros de Aceite Bosch (M)</span>
                                <span className="text-gray-500 font-semibold">Stock Medio (9 u.)</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-yellow-500 h-full w-[45%] rounded-full"></div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-gray-700">Pastillas de Freno Delanteras (Universal)</span>
                                <span className="text-green-600 font-semibold">Óptimo (24 u.)</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[85%] rounded-full"></div>
                              </div>
                            </div>

                          </div>

                          <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-3 flex items-center justify-between mt-3 shrink-0">
                            <div className="text-xs text-orange-950 pr-4">
                              <span className="font-bold block">Orden Sugerida Automática</span>
                              <span className="text-gray-600">Reordenar 20 botes de 5W-30 al distribuidor.</span>
                            </div>
                            <button className="bg-[#EA580C] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
                              Enviar Orden
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {activeFeature.id === 'asistente' && (
                        <motion.div
                          key="asistente-mock"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-center mb-3 shrink-0 border-b border-gray-100 pb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#DB2777] flex items-center justify-center text-white">
                                <IconRobot className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-gray-700">Asistente IA Mecánico</h4>
                                <span className="text-[9px] text-[#DB2777] font-semibold">Conectado a Base de Datos OBD-II</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 flex flex-col gap-3 overflow-y-auto mb-2 pr-1">
                            
                            <div className="self-end max-w-[85%] bg-gray-200 text-gray-800 text-xs p-3 rounded-2xl rounded-tr-none shadow-sm font-['Arimo']">
                              ¿Qué procedimiento sigo para el código P0301 en un motor Mazda Skyactiv 2.0?
                            </div>

                            <div className="self-start max-w-[90%] bg-[#FFF0F5] border border-pink-100 text-gray-800 text-[11px] leading-relaxed p-3 rounded-2xl rounded-tl-none shadow-sm flex items-start gap-2">
                              <IconSparkles className="w-4 h-4 text-[#DB2777] shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-[#DB2777] mb-1">Diagnóstico sugerido:</p>
                                <ol className="list-decimal pl-4 flex flex-col gap-1.5">
                                  <li><strong>Bobinas:</strong> Intercambia la bobina del cil 1 al cil 2. Si la falla migra al cil 2, reemplaza bobina.</li>
                                  <li><strong>Bujía:</strong> Inspecciona si hay acumulación de carbón o electrodo desgastado (luz ideal: 0.044").</li>
                                  <li><strong>Inyector:</strong> Mide resistencia del inyector (típico Mazda: 11.6-12.4 Ω).</li>
                                </ol>
                              </div>
                            </div>

                          </div>

                          <div className="bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-between shrink-0 shadow-sm">
                            <span className="text-xs text-gray-400 pl-2">Preguntar sobre DTCs, diagramas o partes...</span>
                            <div className="w-6 h-6 rounded-lg bg-[#DB2777] flex items-center justify-center text-white">
                              <IconArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Embedded CSS custom Keyframes for the linear animated loading bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes features-progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}} />

    </div>
  );
}
