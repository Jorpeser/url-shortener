'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Link as LinkIcon, 
  Copy, 
  BarChart3, 
  Settings, 
  Plus,
  ExternalLink,
  Calendar,
  MousePointer,
  Globe,
  TrendingUp,
  Eye,
  Share2
} from 'lucide-react';
import type { Page } from '@/app/page';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  title: string;
}

export default function Dashboard({}) {
  const [newUrl, setNewUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [urls, setUrls] = useState<ShortenedUrl[]>([
    {
      id: '1',
      originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
      shortUrl: 'https://short.ly/abc123',
      clicks: 1247,
      createdAt: '2025-01-02',
      title: 'Example Website'
    },
    {
      id: '2',
      originalUrl: 'https://www.github.com/user/repository-name',
      shortUrl: 'https://short.ly/gh456',
      clicks: 892,
      createdAt: '2025-01-01',
      title: 'GitHub Repository'
    },
    {
      id: '3',
      originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      shortUrl: 'https://short.ly/yt789',
      clicks: 2156,
      createdAt: '2024-12-30',
      title: 'YouTube Video'
    }
  ]);

  const handleShortenUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const newShortenedUrl: ShortenedUrl = {
      id: Date.now().toString(),
      originalUrl: newUrl,
      shortUrl: `https://short.ly/${customAlias || Math.random().toString(36).substr(2, 6)}`,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      title: newUrl.split('/')[2] || 'New Link'
    };

    setUrls([newShortenedUrl, ...urls]);
    setNewUrl('');
    setCustomAlias('');
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const totalLinks = urls.length;
  const avgClicksPerLink = totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your shortened URLs and track their performance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Links</p>
                  <p className="text-2xl font-bold text-gray-900">{totalLinks}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <LinkIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <MousePointer className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">{avgClicksPerLink}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">+23%</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl p-1 shadow-sm">
            <TabsTrigger value="create" className="rounded-lg font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Create Link
            </TabsTrigger>
            <TabsTrigger value="manage" className="rounded-lg font-medium">
              <LinkIcon className="h-4 w-4 mr-2" />
              Manage Links
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg font-medium">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Create New Link Tab */}
          <TabsContent value="create">
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Create New Short Link</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShortenUrl} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                      Long URL
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/very-long-url"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alias" className="text-sm font-medium text-gray-700">
                      Custom Alias (Optional)
                    </Label>
                    <Input
                      id="alias"
                      type="text"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      className="py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="my-custom-link"
                    />
                    <p className="text-xs text-gray-500">
                      Leave empty for auto-generated alias
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Shorten URL
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Links Tab */}
          <TabsContent value="manage">
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Your Shortened Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {urls.map((url) => (
                    <div
                      key={url.id}
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-2">{url.title}</h3>
                          <p className="text-sm text-gray-600 mb-2 truncate">{url.originalUrl}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {url.createdAt}
                            </span>
                            <span className="flex items-center">
                              <MousePointer className="h-4 w-4 mr-1" />
                              {url.clicks} clicks
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <div className="flex items-center bg-white rounded-lg border px-3 py-2">
                            <span className="text-sm font-mono text-blue-600 mr-2">{url.shortUrl}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(url.shortUrl)}
                              className="h-6 w-6 p-0 hover:bg-blue-50"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(url.shortUrl, '_blank')}
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Click Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-700">Today</span>
                      <span className="text-2xl font-bold text-blue-600">127</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-700">This Week</span>
                      <span className="text-2xl font-bold text-green-600">892</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium text-gray-700">This Month</span>
                      <span className="text-2xl font-bold text-purple-600">3,421</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Top Performing Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {urls.slice(0, 3).map((url, index) => (
                      <div key={url.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 truncate max-w-32">{url.title}</p>
                            <p className="text-sm text-gray-500">{url.clicks} clicks</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(url.shortUrl)}
                          className="hover:bg-white"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 rounded-2xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <MousePointer className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New click on YouTube Video</p>
                          <p className="text-sm text-gray-500">2 minutes ago • United States</p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-semibold">+1</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-600 rounded-lg">
                          <Plus className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New link created</p>
                          <p className="text-sm text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                      <span className="text-green-600 font-semibold">New</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-600 rounded-lg">
                          <Share2 className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Link shared via social media</p>
                          <p className="text-sm text-gray-500">3 hours ago • Twitter</p>
                        </div>
                      </div>
                      <span className="text-purple-600 font-semibold">Shared</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}