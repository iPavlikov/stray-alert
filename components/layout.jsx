'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Search,
  Bell,
  MessageCircle,
  Settings,
  Menu,
  ChevronUp,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { MapProvider } from '@/providers/map-provider';
import { Map } from '@/modules/map';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const recentReports = [
    {
      id: 1,
      type: 'Lost',
      petName: 'Max',
      breed: 'Golden Retriever',
      lastSeen: '2 hours ago',
      image: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      type: 'Found',
      petName: 'Luna',
      breed: 'Siamese Cat',
      lastSeen: '1 day ago',
      image: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 3,
      type: 'Lost',
      petName: 'Charlie',
      breed: 'Labrador',
      lastSeen: '3 hours ago',
      image: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 4,
      type: 'Found',
      petName: 'Bella',
      breed: 'Persian Cat',
      lastSeen: '5 hours ago',
      image: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 5,
      type: 'Lost',
      petName: 'Rocky',
      breed: 'German Shepherd',
      lastSeen: '1 day ago',
      image: '/placeholder.svg?height=40&width=40',
    },
  ];

  const apiUrl =
    'https://api-maps.yandex.ru/v3/?apikey=8bcaaabb-8495-476d-a4a3-352bac46437d&lang=ru_RU';

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`text-2xl font-bold ${
              isSidebarOpen ? 'block' : 'hidden'
            }`}
          >
            Stray Alert
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <nav className="flex-1">
          <Button variant="ghost" className="w-full justify-start p-4">
            <MapPin className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Map</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start p-4">
            <Search className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Search</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start p-4">
            <Bell className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Alerts</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start p-4">
            <MessageCircle className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Messages</span>}
          </Button>
        </nav>
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <Button variant="ghost" className="w-full justify-start mt-4">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
          )}
        </div>
      </aside>
      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Stray Alert Map</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Report Lost Pet</Button>
              <Button>Report Found Pet</Button>
            </div>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="bg-background p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for lost or found pets..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          {isFiltersOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pet-type">Pet Type</Label>
                <Select>
                  <SelectTrigger id="pet-type">
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date-range">Date Range</Label>
                <Select>
                  <SelectTrigger id="date-range">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Map area */}
        <MapProvider apiUrl={apiUrl}>
          <Map />
        </MapProvider>

        {/* Hideable bottom drawer */}
        <div
          className={`bg-background border-t transition-all duration-300 ease-in-out ${
            isDrawerOpen ? 'h-64' : 'h-12'
          }`}
        >
          <Button
            variant="ghost"
            className="w-full h-12 flex items-center justify-center"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <span className="mr-2">Recent Stray Reports</span>
            {isDrawerOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
          {isDrawerOpen && (
            <ScrollArea className="h-52">
              <div className="p-4 space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={report.image}
                        alt={`${report.petName}'s photo`}
                      />
                      <AvatarFallback>{report.petName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {report.type}: {report.petName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {report.breed}, last seen {report.lastSeen}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </main>
    </div>
  );
}
