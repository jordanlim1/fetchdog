import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import MainPage from '../components/Feed/MainPage'; 
import { BASE_URL } from '../../utils/urls';
import React from 'react';
import Filters from '../components/Feed/Filters';
import { MemoryRouter } from 'react-router-dom'; 
import Login from '../components/Login/Login';
import { act } from 'react'
import { useNavigate } from 'react-router';
import Logout from '../Logout';
import FavoriteDogs from '../components/Favorites/FavoriteDogs';
const breeds = [
  { name: 'Labrador', value: 'Labrador', key: 'Labrador-1' },
  { name: 'Golden Retriever', value: 'Golden Retriever', key: 'Golden-2' }
];

const mockHandleSelectionChange = jest.fn();
const mockGetDogDetails = jest.fn();
const mockSetCurrPage = jest.fn();
const mockSetBreedFilterTags = jest.fn();
const mockGetDogIds = jest.fn()
const mockSetActiveFilterTags = jest.fn()

const mockDogs = [
    { id: '1', name: 'Buddy', breed: 'Labrador', age: 2, img: 'img1.jpg', zip_code: '12345', favorite: false },
    { id: '2', name: 'Max', breed: 'Golden Retriever', age: 3, img: 'img2.jpg', zip_code: '54321', favorite: false },
  ];
  
  jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn(),
  }));
  
  const mockedFetch = jest.fn();
global.fetch = mockedFetch as jest.Mock;

  const mockAddToFavorites = jest.fn();
  global.fetch = jest.fn((url, options) => {
    if (url === `${BASE_URL}/dogs/breeds` && options.credentials === 'include') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(['Labrador', 'Golden Retriever']),
      });
    }
  
    if (url === `${BASE_URL}/dogs/search?size=12&sort=breed:asc` && options.credentials === 'include') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ resultIds: ['1', '2'] }),
      });
    }
  
    if (url === `${BASE_URL}/dogs` && options.credentials === 'include') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([
          { id: '1', name: 'Buddy', breed: 'Labrador', age: 2, img: 'img1.jpg', zip_code: '12345', favorite: false },
          { id: '2', name: 'Max', breed: 'Golden Retriever', age: 3, img: 'img2.jpg', zip_code: '54321', favorite: false },
        ]),
      });
    }
  
    return Promise.reject(new Error('Unknown URL or missing credentials'));
  }) as jest.Mock;

describe('Main Page Tests', () => {


  test('changing min and max age updates the input values', () => {
    const { getByPlaceholderText } = render(
      <Filters
        breeds={breeds}
        selectedBreeds={[]}
        handleSelectionChange={mockHandleSelectionChange}
        getDogDetails={mockGetDogDetails}
        setCurrPage={mockSetCurrPage}
        setBreedFilterTags={mockSetBreedFilterTags}
        getDogIds = {mockGetDogIds}
        setActiveFilterTags={mockSetActiveFilterTags}
      />
    );

    const minAgeInput = getByPlaceholderText('Min Age');
    const maxAgeInput = getByPlaceholderText('Max Age');

    fireEvent.change(minAgeInput, { target: { value: '2' } });
    fireEvent.change(maxAgeInput, { target: { value: '5' } });

    expect(minAgeInput).toHaveValue(2);
    expect(maxAgeInput).toHaveValue(5);
  });


  

  test('renders MainPage and fetches dog data', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MainPage addToFavorites={mockAddToFavorites} show={false} />
      </MemoryRouter>
    );
  
    await waitFor(() => {
        expect(screen.getByPlaceholderText('Breed')).toBeInTheDocument();
      });

    await waitFor(() => {
      expect(getByText('Buddy')).toBeInTheDocument();
      expect(getByText('Max')).toBeInTheDocument();
    });
  });
  

  test('fetches new dog data when navigating to next page', async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <MainPage addToFavorites={jest.fn()} show={false} />
      </MemoryRouter>
    );


    await waitFor(() => {
      expect(getByText('Buddy')).toBeInTheDocument();
    });

    // Simulate clicking the "Next" button in the pagination
    const nextButton = getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/dogs/search?size=12&sort=breed:asc`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    });
  });

  test('calls addToFavorites when favorite button is clicked', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MainPage addToFavorites={mockAddToFavorites} show={false} />
      </MemoryRouter>
    );
  
    
    await waitFor(() => {
      expect(getByText('Buddy')).toBeInTheDocument();
    });
  
    // Simulate clicking the favorite button
    const favoriteButton = getByText('Buddy').parentElement?.querySelector('button');
    if (favoriteButton) {
      fireEvent.click(favoriteButton);
  
      expect(mockAddToFavorites).toHaveBeenCalledWith(mockDogs[0]);
    } else {
      throw new Error('Favorite button not found');
    }
  });
  
  
});


describe('Login page tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('renders login page correctly', () => {
        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
      
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
      
        // Check if images are rendered
        const images = screen.getAllByRole('img');
        expect(images.length).toEqual(6); 
    });

    test('submits form and navigates to main on success', async () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;

        render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
      
        fireEvent.change(screen.getByPlaceholderText('Name'), {
          target: { value: 'John' },
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
          target: { value: 'john@example.com' },
        });
      
        fireEvent.submit(screen.getByText('Login'));
      
        await act(() => Promise.resolve());
      
        expect(global.fetch).toHaveBeenCalledWith(
          `${BASE_URL}/auth/login`,
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ name: 'John', email: 'john@example.com' }),
            credentials: 'include',
          })
        );

        expect(mockNavigate).toHaveBeenCalledWith('/main');
    })
});


    describe('Test logout functionality', () => {
        afterEach(() => {
          jest.clearAllMocks(); 
        });
      
        test('logs out and navigates to home on success', async () => {
          const mockNavigate = jest.fn();
          (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
      
         
          global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
            })
          ) as jest.Mock;
      
          render(
            <MemoryRouter>
              <Logout />
            </MemoryRouter>
          );
      
         
          fireEvent.click(screen.getByText('Logout'));
      
    
          await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/auth/logout`, {
              method: 'POST',
              credentials: 'include',
            });
      
            expect(mockNavigate).toHaveBeenCalledWith('/');
          });
        });
      
        test('handles logout error gracefully', async () => {
          const mockNavigate = jest.fn();
          (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
      
       
          global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: false,
            })
          ) as jest.Mock;
      
          render(
            <MemoryRouter>
              <Logout />
            </MemoryRouter>
          );
      
       
          fireEvent.click(screen.getByText('Logout'));
      
          
          await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/auth/logout`, {
              method: 'POST',
              credentials: 'include',
            });
      
            expect(mockNavigate).not.toHaveBeenCalled();
          });
        });
})

describe('FavoriteDogs Component Tests', () => {
    const favoriteDogsMock = [
      {
        id: '1',
        name: 'Buddy',
        breed: 'Labrador',
        age: 2,
        img: 'img1.jpg',
        zip_code: '12345',
      },
      {
        id: '2',
        name: 'Max',
        breed: 'Golden Retriever',
        age: 3,
        img: 'img2.jpg',
        zip_code: '54321',
      },
    ];
  
    beforeEach(() => {
      jest.clearAllMocks(); 
    });
  
    test('renders favorite dogs correctly', () => {
      render(
        <MemoryRouter>
          <FavoriteDogs favoriteDogs={favoriteDogsMock} />
        </MemoryRouter>
      );
  
      // Check if favorite dogs are rendered
      expect(screen.getByText('The best companions are the ones you choose with your heart.')).toBeInTheDocument();
      expect(screen.getByText('Buddy')).toBeInTheDocument();
      expect(screen.getByText('Max')).toBeInTheDocument();
    });
  
const mockedFetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockedFetch; 
});

test('finds a match and displays modal', async () => {
    const favoriteDogs = [
        { id: '1', name: 'Buddy', breed: 'Labrador', age: 2, img: 'img1.jpg', zip_code: '12345' },
        { id: '2', name: 'Max', breed: 'Golden Retriever', age: 3, img: 'img2.jpg', zip_code: '54321' },
    ];

    // Mock the fetch response to return an ID of one dog
    mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ match: '1' }),
    });

    render(
        <MemoryRouter>
            <FavoriteDogs favoriteDogs={favoriteDogs} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/find my perfect match/i));

    await waitFor(() => {
       
        expect(mockedFetch).toHaveBeenCalledWith(`${BASE_URL}/dogs/match`, expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(['1', '2']),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }));

        expect(screen.getByText('Buddy')).toBeInTheDocument(); 
    });
});

})