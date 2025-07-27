# SwiftCalc

A comprehensive, professional-grade calculator suite built with React, TypeScript, and Tailwind CSS. SwiftCalc provides multiple calculator modes including Standard, Scientific, Graphing, Financial, and Unit Conversion calculators - all in one swift, elegant interface.

![Calculator Suite](https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🧮 Calculator Modes
- **Standard Calculator**: Basic arithmetic operations with memory functions
- **Scientific Calculator**: Advanced mathematical functions, trigonometry, logarithms, and more
- **Graphing Calculator**: Plot mathematical functions with customizable viewing windows
- **Financial Calculator**: Loan payments, compound interest, and investment calculations
- **Unit Converter**: Convert between various units (length, weight, temperature, area, volume, time)

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Calculation History**: Track and reuse previous calculations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface with smooth animations
- **Memory Functions**: Store and recall values across calculations

### 🔧 Technical Features
- **Real-time Graphing**: Interactive function plotting with Chart.js
- **Mathematical Expression Parsing**: Powered by Math.js for accurate calculations
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Efficient rendering and state management
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/seehiong/swift-calc.git
   cd swift-calc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📱 Usage Guide

### Standard Calculator
- Basic arithmetic operations (+, -, ×, ÷)
- Memory functions (MC, MR, M+, M-)
- Percentage calculations
- Sign toggle and decimal operations

### Scientific Calculator
- Trigonometric functions (sin, cos, tan) with degree/radian modes
- Logarithmic functions (log, ln)
- Power and root operations
- Constants (π, e)
- Factorial and inverse functions

### Graphing Calculator
- Plot multiple functions simultaneously
- Customizable viewing window (X/Y min/max)
- Function visibility toggle
- Color-coded function lines
- Interactive zoom and pan

### Financial Calculator
- **Loan Calculator**: Calculate monthly payments, total interest
- **Compound Interest**: Calculate growth with various compounding frequencies
- **Investment Calculator**: Plan future value with regular contributions

### Unit Converter
- **Length**: Meters, kilometers, inches, feet, miles, etc.
- **Weight**: Kilograms, pounds, ounces, stones, etc.
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Area**: Square meters, acres, hectares, etc.
- **Volume**: Liters, gallons, cups, fluid ounces, etc.
- **Time**: Seconds, minutes, hours, days, years, etc.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Mathematical Engine**: Math.js
- **Charting**: Chart.js with React-Chart.js-2
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/
│   ├── calculators/
│   │   ├── StandardCalculator.tsx
│   │   ├── ScientificCalculator.tsx
│   │   ├── GraphingCalculator.tsx
│   │   ├── FinancialCalculator.tsx
│   │   └── ConversionCalculator.tsx
│   ├── BoltBadge.tsx
│   ├── CalculatorButton.tsx
│   ├── Display.tsx
│   ├── History.tsx
│   └── ModeSelector.tsx
├── hooks/
│   └── useCalculator.ts
├── types/
│   └── calculator.ts
├── App.tsx
└── main.tsx
```

## 🎯 Key Components

### Calculator Hook (`useCalculator.ts`)
Central state management for all calculator operations, including:
- Display state management
- Memory operations
- Calculation history
- Mode switching
- Theme toggling

### Calculator Components
Each calculator mode is implemented as a separate component with specialized functionality:
- Modular design for easy maintenance
- Consistent UI patterns across modes
- Optimized performance for complex calculations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

### Memory Functions
- **MC (Memory Clear)**: Clear stored memory
- **MR (Memory Recall)**: Recall stored value
- **M+ (Memory Add)**: Add current display to memory
- **M- (Memory Subtract)**: Subtract current display from memory

### Scientific Functions
- Trigonometric: sin, cos, tan (with inverse functions)
- Logarithmic: log (base 10), ln (natural log)
- Power operations: x², x^y, √x
- Constants: π (pi), e (Euler's number)
- Special functions: factorial (!), absolute value

### Graph Features
- Multiple function plotting
- Real-time function updates
- Customizable axis ranges
- Function visibility controls
- Color-coded function identification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Developed by [seehiong](https://github.com/seehiong)
- Built with [Bolt.new](https://bolt.new/) - AI-powered development platform
- Mathematical calculations powered by [Math.js](https://mathjs.org/)
- Charts rendered with [Chart.js](https://www.chartjs.org/)
- Icons provided by [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing [issues on GitHub](https://github.com/seehiong/swift-calc/issues)
2. Create a [new issue](https://github.com/seehiong/swift-calc/issues/new) with detailed information
3. Include steps to reproduce any bugs

---
