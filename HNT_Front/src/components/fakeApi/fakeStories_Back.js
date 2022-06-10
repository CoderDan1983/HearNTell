const fakeStories = [
    {
        title: "3 little pigs",
        //to: '/listener',
        _id: "0",
        rating: 4.2,
        author: "stephen king",
        length: 2493,
        tags: ["fairy tale", "allegory", "suspense"],  
    },
    {
        title: "boy who cried woof",
        //to: '/listener',
        _id: "1",
        rating: 3.7,
        author: "stephenie meyer",
        length: 99432,
        tags: ["fairy tale", "children", "terror", "suspense"],
    },
    { 
        title: "Once upon a Thyme", 
        _id: "4", 
        //to: "/listener",
        rating: 4.8,
        author: "stephen king",
        length: 934293,
        tags: ["fairy tale", "allegory", "mythical", "adventure"],  
    },
    { title: "A Salt and Battery", 
        _id: "5", 
        //to: "/listener",
        rating: 1.9,
        author: "shakespeare",
        length: 3429,
        tags: ["fairy tale", "clean", "positive"],  
    },
    { 
        title: "Lit Math Test", 
        _id: "6", 
        //to: "/listener",
        rating: 3.9,
        author: "henry david throw",
        length: 9999,
        tags: ["historical", "aventure", "positive"],  
    },
]

const fakeStories1 = [
    {
        title: "34 little pigsssssssssssssssssssssssssssssssssssssssssssss",
        rating: 4.2,
        author: "stephen king",
        length: 2493,
        tags: ["fairy tale", "allegory"],
        //to: '/listener',
        _id: "2",
    },
    {
        title: "girl who cried woof",
        rating: 3.7,
        author: "fred meyer",
        length: 99432,
        tags: ["fairy tale", "children", "terror"],
        //to: '/listener',
        _id: "3",
    }
]

const fakeTags = [
    {
        title: "antidisestablishmentarianism",
        highest_bid: 4,
        highest_bidder_id: "zan",
        number_of_stories_with_tag: 0,
    },
    {
        title: "positive",
        highest_bid: 39429,
        highest_bidder_id: "sue",
        number_of_stories_with_tag: 24,
    },
    {
        title: "fairy tale",
        highest_bid: 0,
        highest_bidder_id: "tom",
        number_of_stories_with_tag: 999,
    },
    {
        title: "adventure",
        highest_bid: 24,
        highest_bidder_id: "steve",
        number_of_stories_with_tag: 10293,
    },
    {
        title: "suspense",
        highest_bid: 199,
        highest_bidder_id: "tom",
        number_of_stories_with_tag: 5,
    },
    {
        title: "clean",
        highest_bid: 3,
        highest_bidder_id: "mary",
        number_of_stories_with_tag: 19,
    },
    {
        title: "historical",
        highest_bid: 39429,
        highest_bidder_id: "sue",
        number_of_stories_with_tag: 24,
    },
]

const fakeSearches = [
    {
        user_id: "0a",
        searches: [
            "cat videos", "tails wagging",
            "fairy tale", "suspense",
            "ducks", "adventure",
            "hats", "superheroes",
            "zero", "hero",
        ]
    },
    {
        user_id: "0b",
        searches: [
            "clean", "tails wagging",
            "fairy tale", "suspense",
            "historical", "adventure",
            "hats", "superheroes"
        ]
    },
    
]

const fakeSubList = [ //? can to and _id be the same!?!
    {
        user_id: "0a",
        sublist: [    
            { 
                author: "stephen king",
                _id: "1a",
            },
            { 
                author: "stephenie meyer",
                _id: "1b", 
            },
            { 
                author: "henry david throw",
                _id: "1c",
            }
        ]
    },
    {
        user_id: "0b",
        sublist: [    
            { 
                author: "stephen king",
                _id: "1a",
            },
            { 
                author: "shakespeare",
                _id: "1d",
            },
            { 
                author: "henry david throw",
                _id: "1c",
            }
        ]
    },
]

const fakeBaskets = [ //? can to and _id be the same!?!
    {   
        user_id: "0a",
        playlists: [
            { title: "History", _id: "qqq" },
            { title: "Fairy Tales", _id: "vvv" },
            { title: "Children", _id: "www" },
        ]
    },
    {
        user_id: "0b",
        playlists: [
            { title: "History", _id: "xxx" },
            { title: "Fairy Tales", _id: "yyy" },
            { title: "Children", _id: "zzz" },
        ]
    },
]

const fakeQueue = [ //? can to and _id be the same!?!
    {
        user_id: "0a",
        queue: [
            { title: "Once upon a Thyme", _id: "4" },
            { title: "A Salt and Battery", _id: "5" },
            { title: "Lit Math Test", _id: "6" }
        ]
    },
    {
        user_id: "0b",
        queue: [
            { title: "3 little pigs", _id: "0" },
            { title: "boy who cried woof", _id: "0" },
            { title: "Lit Math Test", _id: "6" }
        ]
    },
]

async function loadStoriesByTag(tag, setter){
    const newStories = await fakeStories1;
    setter(newStories)
}

module.exports = {
    fakeStories, 
    fakeStories1,
    fakeTags,
    fakeSearches,
    fakeSubList,
    fakeBaskets,
    fakeQueue
}