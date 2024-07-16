const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			urlBase: "https://swapi.dev/api/",
			characters: [],
			starships: [],
			planets: [],			
			favorites: [],
			
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				
			},
			changeColor: (index, color) => {
				const store = getStore();

				
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				setStore({ demo: demo });
			},
			getCharacters: async () => {
				try {					
					const response = await fetch(`${getStore().urlBase}/people`)
					const data = await response.json()
					
					if(response.ok){
						setStore({ characters : data.results })
					}
				} catch (error) {
					
				}
			},
			getStarships: async () => {
				try {
					const response = await fetch(`${getStore().urlBase}/starships`)
					const data = await response.json()

					if(response.ok){
						setStore({ starships : data.results })
					}
				} catch (error) {
					
				}
			},
			getPlanets: async () => {
				try {
					const response = await fetch(`${getStore().urlBase}/planets`)
					const data = await response.json()
					
					if(response.ok){
						setStore({ planets : data.results })
					}
				} catch (error) {
					
				}
			},			
			likesCount: (itemName) => {
				const store = getStore()				
				
				if( store.favorites.includes(itemName) ){
					setStore({ favorites: store.favorites.filter( (item)=> item !== itemName ) })
				}else{
					setStore({ favorites: [...store.favorites,itemName] })
				}
				
			},
			deleteLikes: (favorite) => {
				const store = getStore();
				setStore({ favorites: store.favorites.filter( (item)=> item !== favorite )})				
			}
		}
	};
};

export default getState;