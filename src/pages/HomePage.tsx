import { useState } from 'react'
import { User, ChevronDown, ArrowLeft, ArrowRight, X } from 'lucide-react'
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import classNames from 'classnames'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("select", onSelect)
      api.on("reInit", onSelect)

      return () => {
        api?.off("select", onSelect)
        api?.off("reInit", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={classNames("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={classNames(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={classNames(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, React.RefAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'icon'
}


const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'default', 
  size = 'default', 
  ...props 
}) => {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'border border-input hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'h-10 py-2 px-4': size === 'default',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      {...props}
    />
  )
}

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={classNames(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={classNames(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

// Temperature card data
const temperatureData = [
  {
    temp: 38,
    humidity: 48,
    location: "Bagong Silang, Caloocan City",
    time: "10:30 AM, December 17",
    color: "bg-[#B27260]",
    size: "col-span-2 row-span-2"
  },
  {
    temp: 37,
    humidity: 48,
    location: "Bagong Silang, Caloocan City",
    color: "bg-[#B27260]",
    size: "col-span-1 row-span-2"
  },
  {
    temp: 24,
    humidity: 46,
    location: "Bagong Silang, Caloocan City",
    color: "bg-[#77B5B3]",
    size: "col-span-1"
  },
  {
    temp: 24,
    color: "bg-[#77B5B3]",
    size: "col-span-1"
  },
  {
    temp: 26,
    color: "bg-[#A4B5A1]",
    size: "col-span-1"
  }
]

// Sample history data
const historyData = [
  {
    temperature: 24,
    humidity: 45,
    date: "2024-02-09 14:30:00"
  },
  {
    temperature: 26,
    humidity: 48,
    date: "2024-02-09 13:30:00"
  },
  {
    temperature: 25,
    humidity: 47,
    date: "2024-02-09 12:30:00"
  },
  {
    temperature: 23,
    humidity: 46,
    date: "2024-02-08 14:30:00"
  },
  {
    temperature: 22,
    humidity: 44,
    date: "2024-02-02 14:30:00"
  }
]

interface UserProfile {
  username: string;
  password: string;
  email: string;
  deviceName: string;
  [key: string]: string;
}

type TimeFilter = 'Today' | 'Yesterday' | 'Week Ago';



export default function HomePage() {
  const [profile, setProfile] = useState<UserProfile>({
    username: 'Kopibara',
    password: '••••••••••',
    email: 'kopibara@gmail.com',
    deviceName: "Kopibara's Sensor"
  });
  const [formData, setFormData] = useState<UserProfile>(profile)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'Profile' | 'Preference'>('Profile')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('Today')
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };
  
  
  
  

  
    
  const filteredHistory = React.useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    return historyData.filter(item => {
      const itemDate = new Date(item.date);
      switch (timeFilter) {
        case 'Today':
          return itemDate >= today;
        case 'Yesterday':
          return itemDate >= yesterday && itemDate < today;
        case 'Week Ago':
          return itemDate >= weekAgo;
        default:
          return true;
      }
    });
  }, [timeFilter]);

  return (
    <div className="min-h-screen bg-black text-white font-questrial">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/temphu-logo.svg" alt="Temphu" className="w-6 h-6" />
            <span className="font-medium">Temphu</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Celcius</span>
            <div className="relative">
              <button 
                className="flex items-center gap-2 text-sm"
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
              >
                {timeFilter} <ChevronDown className="w-4 h-4" />
              </button>
              {isTimeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-black border border-white/10 rounded-lg shadow-lg py-1 z-30">
                  {(['Today', 'Yesterday', 'Week Ago'] as TimeFilter[]).map((option) => (
                    <button
                      key={option}
                      className={classNames(
                        "w-full px-4 py-2 text-sm text-left hover:bg-white/10",
                        timeFilter === option ? "text-white" : "text-gray-400"
                      )}
                      onClick={() => {
                        setTimeFilter(option);
                        setIsTimeDropdownOpen(true);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              className="p-2 hover:bg-white/10 rounded-full"
              onClick={() => setIsModalOpen(true)}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto p-4 space-y-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {temperatureData.map((item, index) => (
              <CarouselItem key={index} className={`pl-4 ${index === 0 ? 'md:basis-2/3' : index === 1 ? 'md:basis-1/2' : 'md:basis-1/3'}`}>
                <div className={`${item.color} h-full p-6 flex flex-col justify-between rounded-lg transition-all duration-300`}>
                  <div className="space-y-2">
                    <div className={`${index === 0 ? 'text-8xl' : index === 1 ? 'text-6xl' : 'text-4xl'} font-light`}>
                      {item.temp}°C
                    </div>
                    {item.humidity && (
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-white rounded-full" />
                          Humidity: {item.humidity}%
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-white rounded-full" />
                            {item.location}
                          </div>
                        )}
                        {item.time && (
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-white rounded-full" />
                            {item.time}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

      </main>

       {/* Profile/Preference Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-black border border-white/10 rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 text-lg">
                <Button
                  className={activeTab === 'Profile' ? 'text-white' : 'text-gray-500'}
                  onClick={() => setActiveTab('Profile')}
                >
                  Profile
                </Button>
                <span className="text-gray-500">/</span>
                <Button
                  className={activeTab === 'Preference' ? 'text-white' : 'text-gray-500'}
                  onClick={() => setActiveTab('Preference')}
                >
                  Preference
                </Button>
              </div>
              <Button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {activeTab === 'Profile' ? (
  <form onSubmit={handleSubmit} className="space-y-4">
    {['username', 'email', 'password'].map((field) => (
      <div key={field} className="space-y-2">
        <label htmlFor={field} className="text-gray-500 text-sm capitalize">{field}:</label>
        {isEditing ? (
          <input
            id={field}
            name={field}
            type={field === 'password' ? 'password' : 'text'}
            value={formData[field as keyof UserProfile]}
            onChange={handleInputChange}
            className="w-full p-2 bg-white/10 rounded text-white"
            required
          />
        ) : (
          <div className="text-white">{profile[field as keyof UserProfile]}</div>
        )}
      </div>
    ))}
    <div className="space-y-2">
      <label className="text-gray-500 text-sm">Device Name:</label>
      <div className="text-white">{profile.deviceName}</div>
    </div>
    <div className="flex justify-end">
      {isEditing ? (
        <>
          <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-2">
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-500 hover:text-white transition-colors text-sm"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={handleEdit}
          className="text-gray-500 hover:text-white transition-colors text-sm"
        >
          Edit
        </button>
      )}
    </div>
  </form>
) : (
  <div className="space-y-4">
    <div className="space-y-2">
      <label className="text-gray-500 text-sm">Metric Unit:</label>
      <div className="text-white">
        Celcius / <span className="text-gray-400">Fahrenheit</span>
      </div>
    </div>
  


    <div className="space-y-2">
      <label className="text-gray-500 text-sm">Theme:</label>
      <div className="text-white">
        Light Mode / <span className="text-white">Dark Mode</span>
      </div>
    </div>
  </div>
)}

          </div>
        </div>
      )}

      {/* Time Filter Modal */}
      {isTimeDropdownOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-black border border-white/10 rounded-lg w-full max-w-4xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Temperature History - {timeFilter}</h2>
              <button
                onClick={() => setIsTimeDropdownOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>  
  

            <div className="border border-white/10 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Temperature</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Humidity</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((record, index) => (
                    <tr 
                      key={index} 
                      className={classNames(
                        "transition-colors hover:bg-white/5",
                        index !== filteredHistory.length - 1 ? "border-b border-white/5" : ""
                      )}
                    >
                      <td className="px-6 py-4 text-sm">{record.temperature}°C</td>
                      <td className="px-6 py-4 text-sm">{record.humidity}%</td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(record.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {filteredHistory.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-400">
                        No data available for this time period
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

