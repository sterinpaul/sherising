import type { Article, Impact, DashboardStats } from '../types/dashboard';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Understanding Gender Equality in Education',
    content: '<h2>Introduction</h2><p>Gender equality in education remains a critical issue...</p><p>This article explores the various dimensions of educational equity and provides insights into creating more inclusive learning environments.</p>',
    excerpt: 'Exploring the various dimensions of educational equity and creating inclusive learning environments.',
    category: 'Education',
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    publishedAt: '2024-01-15T12:00:00Z',
    featuredImage: '/images/education-equality.jpg',
    tags: ['education', 'gender-equality', 'social-justice'],
    author: {
      id: '1',
      name: 'Admin User'
    }
  },
  {
    id: '2',
    title: 'The Impact of Menstrual Health Programs',
    content: '<h2>Breaking the Silence</h2><p>Menstrual health programs have shown significant impact...</p><p>Our research demonstrates how proper education and resources can transform communities.</p>',
    excerpt: 'How proper menstrual health education and resources can transform communities.',
    category: 'Health',
    status: 'published',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    publishedAt: '2024-01-20T15:00:00Z',
    featuredImage: '/images/menstrual-health.jpg',
    tags: ['health', 'menstruation', 'community-impact'],
    author: {
      id: '1',
      name: 'Admin User'
    }
  },
  {
    id: '3',
    title: 'Breaking Barriers: Women in STEM',
    content: '<h2>The Current Landscape</h2><p>Women in STEM fields face unique challenges...</p><p>This article examines strategies to increase female participation in science and technology.</p>',
    excerpt: 'Examining strategies to increase female participation in science and technology fields.',
    category: 'STEM',
    status: 'draft',
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    featuredImage: '/images/women-stem.jpg',
    tags: ['stem', 'women-empowerment', 'career-development'],
    author: {
      id: '1',
      name: 'Admin User'
    }
  }
];

export const mockImpacts: Impact[] = [
  {
    id: '1',
    title: 'Webinar: Food & Climate Change',
    description: 'Educational webinar discussing the intersection of food systems and climate change.',
    content: '<h2>Event Overview</h2><p>Our webinar on Food & Climate Change brought together experts...</p><p>Participants learned about sustainable food practices and their environmental impact.</p>',
    date: '2024-08-05',
    status: 'published',
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-08-01T10:00:00Z',
    featuredImage: '/images/food-climate-webinar.jpg',
    location: 'Online',
    participants: 150
  },
  {
    id: '2',
    title: 'Menstruation 101: Kerala Outreach',
    description: 'Community outreach program providing menstrual health education in Kerala.',
    content: '<h2>Community Impact</h2><p>Our outreach program in Kerala reached over 200 young women...</p><p>The program included educational workshops, resource distribution, and follow-up support.</p>',
    date: '2024-08-30',
    status: 'published',
    createdAt: '2024-08-25T12:00:00Z',
    updatedAt: '2024-08-25T12:00:00Z',
    featuredImage: '/images/kerala-outreach.jpg',
    location: 'Chalakudy, Kerala',
    participants: 200
  },
  {
    id: '3',
    title: 'Empowering Dreams: Scholarship Guidance Session',
    description: 'Guidance session helping students navigate scholarship opportunities.',
    content: '<h2>Empowerment Through Education</h2><p>Our scholarship guidance session provided valuable insights...</p><p>Students received personalized advice on applications and funding opportunities.</p>',
    date: '2024-08-31',
    status: 'published',
    createdAt: '2024-08-28T15:30:00Z',
    updatedAt: '2024-08-28T15:30:00Z',
    featuredImage: '/images/scholarship-guidance.jpg',
    location: 'Community Center',
    participants: 75
  },
  {
    id: '4',
    title: 'Roundtable Discussion: Gender Roles And Stereotypes',
    description: 'Interactive discussion about challenging traditional gender roles and stereotypes.',
    content: '<h2>Breaking Down Barriers</h2><p>Our roundtable discussion will explore...</p><p>This is a draft event planned for the future.</p>',
    date: '2025-02-28',
    status: 'draft',
    createdAt: '2024-12-01T09:00:00Z',
    updatedAt: '2024-12-01T09:00:00Z',
    location: 'To be determined',
    participants: 0
  }
];

export const mockStats: DashboardStats = {
  totalArticles: mockArticles.length,
  totalImpacts: mockImpacts.length,
  publishedArticles: mockArticles.filter(a => a.status === 'published').length,
  publishedImpacts: mockImpacts.filter(i => i.status === 'published').length,
  draftArticles: mockArticles.filter(a => a.status === 'draft').length,
  draftImpacts: mockImpacts.filter(i => i.status === 'draft').length,
  recentViews: 1247
};

// API-like functions for CRUD operations
export const articleAPI = {
  getAll: (): Promise<Article[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockArticles]), 500);
    });
  },

  getById: (id: string): Promise<Article | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const article = mockArticles.find(a => a.id === id) || null;
        resolve(article);
      }, 300);
    });
  },

  create: (article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<Article> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newArticle: Article = {
          ...article,
          id: (mockArticles.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockArticles.push(newArticle);
        resolve(newArticle);
      }, 800);
    });
  },

  update: (id: string, updates: Partial<Article>): Promise<Article | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockArticles.findIndex(a => a.id === id);
        if (index !== -1) {
          mockArticles[index] = {
            ...mockArticles[index],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          resolve(mockArticles[index]);
        } else {
          resolve(null);
        }
      }, 600);
    });
  },

  delete: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockArticles.findIndex(a => a.id === id);
        if (index !== -1) {
          mockArticles.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  }
};

export const impactAPI = {
  getAll: (): Promise<Impact[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockImpacts]), 500);
    });
  },

  getById: (id: string): Promise<Impact | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const impact = mockImpacts.find(i => i.id === id) || null;
        resolve(impact);
      }, 300);
    });
  },

  create: (impact: Omit<Impact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Impact> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newImpact: Impact = {
          ...impact,
          id: (mockImpacts.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockImpacts.push(newImpact);
        resolve(newImpact);
      }, 800);
    });
  },

  update: (id: string, updates: Partial<Impact>): Promise<Impact | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockImpacts.findIndex(i => i.id === id);
        if (index !== -1) {
          mockImpacts[index] = {
            ...mockImpacts[index],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          resolve(mockImpacts[index]);
        } else {
          resolve(null);
        }
      }, 600);
    });
  },

  delete: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockImpacts.findIndex(i => i.id === id);
        if (index !== -1) {
          mockImpacts.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  }
};

export const statsAPI = {
  get: (): Promise<DashboardStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentStats: DashboardStats = {
          totalArticles: mockArticles.length,
          totalImpacts: mockImpacts.length,
          publishedArticles: mockArticles.filter(a => a.status === 'published').length,
          publishedImpacts: mockImpacts.filter(i => i.status === 'published').length,
          draftArticles: mockArticles.filter(a => a.status === 'draft').length,
          draftImpacts: mockImpacts.filter(i => i.status === 'draft').length,
          recentViews: mockStats.recentViews + Math.floor(Math.random() * 10)
        };
        resolve(currentStats);
      }, 300);
    });
  }
};