/* global Module */

/* MagicMirror²
 * Module: QuoteCatalog
 *
 * Author: Sally Park
 * Version: v1.0 - February 2018
 * MIT Licensed.
 */


Module.register("MagicMirror-QuoteCatalog",{

    // Module config defaults.
    defaults: {
        updateInterval: 300,    // How often a new quote gets displayed.
        fadeSpeed: 5,           // How fast to fade out and back in when changing quotes.
        quotes: {
            quotes : [
     '“Ask: What is so unbearable about this situation? Why can’t you endure it? You will be embarrassed to answer.” ~ Marcus Aurelius',
     '“You don’t have to turn this into something. It doesn’t have to upset you.” ~ Marcus Aurelius',
     '“Be tolerant with others and strict with yourself.” ~ Marcus Aurelius',	
     '“The best revenge is not to be like your enemy.” ~ Marcus Aurelius',
    '"Never Let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.” ~ Marcus Aurelius',
     '"Waste no more time arguing what a good man should be. Be One.", ~ Marcus Aurelius',
     '"Your task is to stand straight; not to be held straight." ~ Marcus Aurelius',
    '"First say to yourself what you would be; and then do what you have to do." ~ Epictetus',
    '"We mortals also are lighted and extinguished; the period of suffering comes in between, but on either side there is a deep peace." ~ Seneca',
    '"Everyone hurries his life on and suffers from a yearning for the future and a weariness of the present. But he who bestows all of his time on his own needs, who plans out every day as if it were his last, neither longs for nor fears the morrow." ~ Seneca,
    '"No evil propensity of the human heart is so powerful that it may not be subdued by discipline." ~ Seneca',
    '"You act like mortals in all that you fear, and like immortals in all that you desire." ~ Seneca',
    '“Life is very short and anxious for those who forget the past, neglect the present, and fear the future.” ~ Seneca',
    '"The man who has anticipated the coming of troubles takes away their power when they arrive." ~ Seneca',
    '"He is most powerful who has power over himself." ~ Seneca,'
    '"These two things must be cut away: fear of the future, and the memory of past sufferings. The latter no longer concerns me, and the future does not concern me yet." ~ Seneca',
     '"Eyes will not see when the heart wishes them to be blind." ~ Seneca', 
     '"A gem cannot be polished without friction, nor a man without trials." ~ Seneca',
     '"Fate leads the willing, and drags along the reluctant.", ~ Seneca',
      '"Only time can heal what reason cannot.", ~ Seneca',
       '"He suffers more than necessary, who suffers before it is necessary." ~ Seneca',
       '"What need is there to weep over parts of life? The whole of it calls for tears." ~ Seneca',
       '"It is not the man who has too little, but the man who craves more, that is poor." ~ Seneca',
          '"Difficulties strengthen the mind, as labor does the body." ~ Seneca',
          '"Luck is what happens when preparation meets opportunity.", ~ Seneca',
    '"Many of us crucify ourselves between two thieves - regret for the past and fear of the future." ~ Fulton Oursler', 
    '"Weakness of attitude becomes weakness of character." ~ Albert Einstein',
    '"In the middle of difficulty lies opportunity." ~ Albert Einstein',
    '"A clever person solves a problem. A wise person avoids it." ~ Albert Einstein',
    '"Once we accept our limits, we go beyond them." ~ Albert Einstein',
]
        },
    },


    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);

        this.lastQuoteIndex = -1;

        // Schedule update timer.
        var self = this;
        setInterval(function() {
            self.updateDom(self.config.fadeSpeed * 1000);
        }, this.config.updateInterval * 1000);
    },

    /* randomIndex(quotes)
     * Generate a random index for a list of quotes.
     *
     * argument quotes Array<String> - Array with quotes.
     *
     * return Number - Random index.
     */
    randomIndex: function(quotes) {
        if (quotes.length === 1) {
            return 0;
        }

        var generate = function() {
            return Math.floor(Math.random() * quotes.length);
        };

        var quoteIndex = generate();

        while (quoteIndex === this.lastQuoteIndex) {
            quoteIndex = generate();
        }

        this.lastQuoteIndex = quoteIndex;

        return quoteIndex;
    },

    /* quoteArray()
     * Retrieve an array of quotes from the catalog.
     *
     * return quotes Array<String> - Array with quotes from the catalog.
     */
    quoteArray: function() {
        return this.config.quotes[Object.keys(this.config.quotes)[Math.floor(Math.random() * Object.keys(this.config.quotes).length)]];
    },

    /* randomQuote()
     * Retrieve a random quote.
     *
     * return quote string - A quote.
     */
    randomQuote: function() {
        var quotes = this.quoteArray();
        var index = this.randomIndex(quotes);
        return quotes[index].split(" ~ ");
    },

    // Override dom generator.
    getDom: function() {
        var quoteText = this.randomQuote();

        var qMsg = quoteText[0];
        var qAuthor = quoteText[1];

        var wrapper = document.createElement("div");

        var quote = document.createElement("div");
        quote.className = "bright small light";
        quote.style.textAlign = 'justify';
        quote.style.margin = '0 auto';
        quote.style.maxWidth = '400px';
        quote.innerHTML = qMsg;

        wrapper.appendChild(quote);

        var author = document.createElement("div");
        author.className = "light small dimmed";
        author.innerHTML = "~ " + qAuthor;

        wrapper.appendChild(author);

        return wrapper;
    }

});
