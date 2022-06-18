const fakeStories = [
    {
        account_id: "0a",//todo new!
        audio_url: "www.bob.ko",//todo new!
        description: "www.bob.ko",//todo new!
        private: false,//todo new!

        title: "3 little pigs",
        //to: '/listener',
        _id: "0",
        rating: 4.2, //ie- popularity_rating
        author: "stephen king",
        length: 2493,
        tags: [
            { tag: "fairy tale", likes: 984, dislikes: 23 },
            { tag: "allegory", likes: 323, dislikes: 4 },   
            { tag: "suspense", likes: 1234, dislikes: 51 },
        ],
    },
    {
        account_id: "0a",//todo new!
        audio_url: "www.bob.ko",//todo new!
        description: "www.bob.ko",//todo new!
        private: false,//todo new!

        title: "boy who cried woof",
        //to: '/listener',
        _id: "1",
        rating: 3.7,
        author: "stephenie meyer",
        length: 99432,
        tags: [
            { tag: "fairy tale", likes: 998, dislikes: 103 },
            { tag: "children", likes: 3429, dislikes: 1 },   
            { tag: "terror", likes: 19, dislikes: 983 },
            { tag: "parable", likes: 9382932, dislikes: 0 },
        ],
    },
    {
        account_id: "0a",//todo new!
        audio_url: "www.bob.ko",//todo new!
        description: "www.bob.ko",//todo new!
        private: false,//todo new!

        title: "Once upon a Thyme", 
        _id: "4", 
        //to: "/listener",
        rating: 4.8,
        author: "stephen king",
        length: 934293,
        tags: [
            { tag: "fairy tale", likes: 2342, dislikes: 56 },
            { tag: "parable", likes: 5532, dislikes: 193 },   
            { tag: "mythical", likes: 2342, dislikes: 19 },
            { tag: "adventure", likes: 34568, dislikes: 154 },
        ],
    },
    { 
        account_id: "0a",//todo new!
        audio_url: "www.bob.ko",//todo new!
        description: "www.bob.ko",//todo new!
        private: false,//todo new!

        title: "A Salt and Battery", 
        _id: "5", 
        rating: 1.9,
        author: "shakespeare",
        length: 3429,
        tags: [
            { tag: "fairy tale", likes: 293, dislikes: 155 },
            { tag: "clean", likes: 352, dislikes: 15 },   
            { tag: "suspense", likes: 342, dislikes: 34 },
        ],
    },
    { 
        account_id: "0b",//todo new!
        audio_url: "www.harry.ko",//todo new!
        description: "www.sue.ko",//todo new!
        private: true,//todo new!

        title: "Lit Math Test", 
        _id: "6", 
        rating: 3.9,
        author: "henry david throw",
        length: 9999,
        tags: [
            { tag: "historical", likes: 9384, dislikes: 233 },
            { tag: "adventure", likes: 3675, dislikes: 94 },   
            { tag: "positive", likes: 237, dislikes: 15 },
        ],
    },
    {
        account_id: "0a",//todo new!
        audio_url: "www.bob.ko",//todo new!
        description: "www.bob.ko",//todo new!
        private: true,//todo new!

        title: "34 little pigsssssssssssssssssssssssssssssssssssssssssssss",
        rating: 4.2,
        author: "stephen king",
        length: 2493,
        //to: '/listener',
        _id: "2",
        tags: [
            { tag: "fairy tale", likes: 35, dislikes: 522123 },
            { tag: "allegory", likes: 1, dislikes: 16674 },   
        ],
    },
    {
        account_id: "0b",//todo new!
        audio_url: "www.bob.ko",//todo new!
        description: "www.bob.ko",//todo new!
        private: false,//todo new!

        title: "girl who cried woof",
        rating: 3.7,
        author: "fred meyer",
        length: 99432,
        //to: '/listener',
        _id: "3",
        tags: [
            { tag: "fairy tale", likes: 3251, dislikes: 16 },
            { tag: "children", likes: 9846, dislikes: 61 },   
            { tag: "terror", likes: 163, dislikes: 43 },
        ],
    }
]

const fakeStories1 = [
    {
        title: "34 little pigsssssssssssssssssssssssssssssssssssssssssssss",
        rating: 4.2,
        author: "stephen king",
        length: 2493,
        //to: '/listener',
        _id: "2",
        tags: [
            { tag: "fairy tale", likes: 35, dislikes: 522123 },
            { tag: "allegory", likes: 1, dislikes: 16674 },   
        ],
    },
    {
        title: "girl who cried woof",
        rating: 3.7,
        author: "fred meyer",
        length: 99432,
        //to: '/listener',
        _id: "3",
        tags: [
            { tag: "fairy tale", likes: 3251, dislikes: 16 },
            { tag: "children", likes: 9846, dislikes: 61 },   
            { tag: "terror", likes: 163, dislikes: 43 },
        ],
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

const fakePlaylist = [
    {
        _id: "qqq",
        story_ids: [
            "1", "3", "5"
        ]
    },
    {
        _id: "vvv",
        story_ids: [
            "0", "1", "2"
        ]
    },
    {
        _id: "www",
        story_ids: [
            "1", "2", "3"
        ]
    },
    {
        _id: "xxx",
        story_ids: [
            "2", "3", "4"
        ]
    },
    {
        _id: "yyy",
        story_ids: [
            "3", "4", "5"
        ]
    },
    {
        _id: "zzz",
        story_ids: [
            "4", "5", "6"
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

// async function loadStoriesByTag(tag, setter){
//     const newStories = await fakeStories1;
//     setter(newStories)
// }

module.exports = {
    fakeStories, 
    fakeStories1,
    fakeTags,
    fakeSearches,
    fakeSubList,
    fakeBaskets,
    fakePlaylist,
    fakeQueue
}