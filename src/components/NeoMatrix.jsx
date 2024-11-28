import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Cpu, 
  Wifi, 
  Terminal as TerminalIcon, 
  Power, 
  Database, 
  Cloud, 
  Lock, 
  Activity,
  Volume2,
  VolumeX 
} from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center min-h-screen">
      <div className="text-center w-full max-w-md px-4">
        {/* Centered Hexagon Animation */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                border: '2px solid #00ff00',
                borderRadius: '50%',
                animation: `spin ${3 + i}s linear infinite${i % 2 ? ' reverse' : ''}`,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${100 - i * 20}%`,
                height: `${100 - i * 20}%`,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-lime-500 text-4xl font-bold font-mono">
              {progress}%
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <div className="text-lime-500 font-mono text-xl tracking-widest">
            SYSTEM INITIALIZATION
          </div>
          <div className="w-64 h-2 bg-lime-900/30 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-lime-500 transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
              }}
            />
          </div>
          <div className="text-lime-500/70 font-mono text-sm animate-pulse">
            Loading TERA Systems...
          </div>
        </div>
      </div>
    </div>
  );
};

// Music Player Component
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-lime-500/50 rounded-full hover:bg-lime-500/10 transition-all duration-300 group"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-lime-500 animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-lime-500" />
        )}
        <span className="text-lime-500 font-mono text-sm">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>
      </button>
      <audio ref={audioRef} loop>
        <source src="/interstellar.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
};


// Matrix Rain Background Component
const MatrixRain = () => {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    const chars = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const columns = Math.floor(window.innerWidth / 20);
    
    const generateRaindrop = () => ({
      id: Math.random(),
      x: Math.floor(Math.random() * columns) * 20,
      y: -20,
      speed: 1 + Math.random() * 2,
      char: chars[Math.floor(Math.random() * chars.length)],
      opacity: Math.random() * 0.5 + 0.5
    });

    const initialRaindrops = Array.from({ length: 50 }, generateRaindrop);
    setRaindrops(initialRaindrops);

    const interval = setInterval(() => {
      setRaindrops(prevDrops => {
        return prevDrops.map(drop => {
          if (drop.y > window.innerHeight) {
            return generateRaindrop();
          }
          return {
            ...drop,
            y: drop.y + drop.speed,
            char: Math.random() < 0.1 ? chars[Math.floor(Math.random() * chars.length)] : drop.char
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="absolute font-mono text-lime-500"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            opacity: drop.opacity,
            textShadow: '0 0 8px rgba(0, 255, 0, 0.8)',
            transition: 'opacity 0.5s'
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

const InteractiveCard = ({ icon: Icon, title, description, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border border-lime-500/30 p-6 backdrop-blur-sm bg-black/50 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-lime-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 ${isHovered ? 'animate-pulse' : ''}`} />
        <h3 className="text-xl font-mono">{title}</h3>
      </div>
      <p className="text-lime-400/80">{description}</p>
      <div className={`mt-4 h-1 bg-lime-500/30 ${isHovered ? 'animate-pulse' : ''}`} />
    </div>
  );
};

const Terminal = ({ onClose }) => {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);

  const terminalInfo = [
    'TERA AI TERMINAL V1.0.0',
    '=====================================',
    `Last login: ${new Date().toLocaleString()}`,
    'Connected to: TERA Core Network',
    'Security Protocol: ACTIVE',
    'Neural Interface: STABLE',
    '',
    "Type 'help' for available commands",
    '',
    'terasystems@ai-term:~$ '
  ];

  useEffect(() => {
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex < terminalInfo.join('\n').length) {
        setText(prev => prev + terminalInfo.join('\n')[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 50);

    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => {
      clearInterval(textInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    
    switch (command) {
      case 'help':
        return `Available commands:
• status  - Show system status
• clear   - Clear terminal
• scan    - Run security scan
• connect - Test network connection
• info    - Show system information
• matrix  - Toggle matrix effect
• hack    - Initiate hack sequence
• exit    - Close terminal`;
      
      case 'status':
        return `SYSTEM STATUS:
Neural Networks: ACTIVE
Memory Usage: ${Math.floor(Math.random() * 30 + 70)}%
Active Processes: ${Math.floor(Math.random() * 100)}
Security Level: MAXIMUM
Temperature: ${Math.floor(Math.random() * 10 + 60)}°C
Uptime: ${Math.floor(Math.random() * 1000)} hours`;

      case 'scan':
        return `Initiating security scan...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[▓▓▓▓▓▓▓▓▓▓] 100%
Scan complete.
• Ports scanned: ${Math.floor(Math.random() * 1000 + 5000)}
• Vulnerabilities found: 0
• Firewall status: Active
• Encryption: TERA-grade
System integrity verified.`;

      case 'connect':
        return `Testing network connection...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ping: ${Math.floor(Math.random() * 10 + 5)}ms
Download: ${(Math.random() * 2 + 1).toFixed(1)} GB/s
Upload: ${(Math.random() * 1 + 0.5).toFixed(1)} GB/s
Latency: ${Math.floor(Math.random() * 20 + 10)}ms
Packet Loss: 0%
Connection Status: SECURED
Encryption: Enabled`;

      case 'info':
        return `TERA SYSTEMS v3.1.4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Build: QS-${Math.floor(Math.random() * 9000 + 1000)}
OS: CyberOS TERA Edition
Kernel: 5.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 100)}
Architecture: TERA x64
CPU: Neural Processing Unit
RAM: ${Math.floor(Math.random() * 100 + 100)}GB TERA Memory
Last Update: ${new Date().toLocaleDateString()}`;

      case 'hack':
        return `INITIATING HACK SEQUENCE...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[!] WARNING: Unauthorized access detected
[!] Countermeasures deployed
[!] Trace program initiated
[!] Connection terminated
ACCESS DENIED`;

      case 'matrix':
        return `Toggling Matrix rain effect...
TERA visualization enabled
Reality distortion: Active
Digital rain: Initialized
Matrix mode: ENABLED`;

      case 'clear':
        setText('');
        setCommandHistory([]);
        return '';

      case 'exit':
        onClose();
        return '';

      default:
        return `Command not recognized. Type 'help' for available commands.`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newCommand = currentInput.trim();
      if (newCommand) {
        const output = handleCommand(newCommand);
        setCommandHistory([...commandHistory, { input: newCommand, output }]);
        setText(prev => `${prev}${newCommand}\n${output}\nterasystems@ai-term:~$ `);
      }
      setCurrentInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="w-full max-w-4xl h-[600px] border-2 border-lime-500/50 p-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-lime-500 hover:text-lime-400 font-mono"
        >
          [X]
        </button>
        <div 
          className="font-mono text-lime-500 whitespace-pre-wrap h-full overflow-y-auto scrollbar-thin scrollbar-thumb-lime-500 scrollbar-track-transparent"
          style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.5)' }}
        >
          {text}
          <div className="flex items-center">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-transparent border-none outline-none text-lime-500 font-mono ml-2 w-full"
              autoFocus
            />
            <span className={`text-lime-500 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▊</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const Website = () => {
  const [loading, setLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeSystem, setActiveSystem] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds loading screen

    return () => clearTimeout(timer);
  }, []);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const systemCards = [
    {
      icon: Database,
      title: 'TERA Database',
      description: 'Access the TERA-encrypted database system.',
      onClick: () => {
        addNotification('Accessing TERA Database...');
        setActiveSystem('database');
      }
    },
    {
      icon: Cloud,
      title: 'Neural Network',
      description: 'Monitor and control AI neural networks.',
      onClick: () => {
        addNotification('Neural Network systems engaged...');
        setActiveSystem('neural');
      }
    },
    {
      icon: Lock,
      title: 'Security Protocol',
      description: 'Manage system security and access controls.',
      onClick: () => {
        addNotification('Security protocols activated...');
        setActiveSystem('security');
      }
    },
    {
      icon: Activity,
      title: 'System Metrics',
      description: 'Real-time system performance monitoring.',
      onClick: () => {
        addNotification('Loading system metrics...');
        setActiveSystem('metrics');
      }
    }
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-lime-500 relative">
      <MatrixRain />
      
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(({ id, message }) => (
          <div
            key={id}
            className="bg-lime-500/10 border border-lime-500/30 text-lime-500 px-4 py-2 rounded backdrop-blur-sm animate-slideIn"
          >
            {message}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-lime-500/30 backdrop-blur-sm bg-black/50">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 animate-pulse" />
              <span className="font-mono text-xl">TERA SYSTEMS</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Power className="w-4 h-4 text-lime-500 animate-pulse" />
                <Cpu className="w-4 h-4 text-lime-500" />
                <Wifi className="w-4 h-4 text-lime-500 animate-pulse" />
              </div>
              <button
                onClick={() => setShowTerminal(true)}
                className="flex items-center gap-2 px-4 py-2 border border-lime-500/50 hover:bg-lime-500/10 transition-colors"
              >
                <TerminalIcon className="w-4 h-4" />
                <span>Access Terminal</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6 backdrop-blur-sm bg-black/50 p-6 rounded-lg border border-lime-500/30">
              <h1 className="text-4xl font-mono font-bold">
                Next Generation AI Systems
              </h1>
              <p className="text-lime-400/80">
                Advanced TERA computing solutions for the future of terasystems.
              </p>
              <div className="flex gap-4">
                <Cpu className="w-8 h-8" />
                <Wifi className="w-8 h-8" />
              </div>
            </div>
            <div className="border border-lime-500/30 p-6 backdrop-blur-sm bg-black/50 rounded-lg">
              <h2 className="text-2xl font-mono mb-4">System Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Neural Networks</span>
                  <span className="text-lime-400">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>TERA Core</span>
                  <span className="text-lime-400">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Protocol</span>
                  <span className="text-lime-400">ENABLED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemCards.map((card, index) => (
              <InteractiveCard key={index} {...card} />
            ))}
          </div>
        </main>

        {/* Music Player */}
        <MusicPlayer />

        {/* Terminal Modal */}
        {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
      </div>
    </div>
  );
};

export default Website;