const Block = require('./block');
const { GENISIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp, lastHash, hash, data, nonce, difficulty});




it('Has a timestamp, lastHash, hash, and data property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
});

describe('genisis()', () =>{
    const genisisBlock = Block.genisis();

    //console.log('genisisBlock', genisisBlock);
    
    

    it('returns a Block instance', () =>{
        expect(genisisBlock instanceof Block).toBe(true);
    });
    it('returns the genisis data', () =>{
        expect(genisisBlock).toEqual(GENISIS_DATA);
    });

    });
    describe('mineBlock()', () =>{
        const lastBlock = Block.genisis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock ({ lastBlock, data});


        it('returns a Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `hash` of the lastBlock', () =>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });
        it('sets the `data`', () =>{
            expect(minedBlock.data).toEqual(data);

     });
     it('sets the `timestamp`', () =>{
        expect(minedBlock.timestamp).not.toEqual(undefined);
   });

   it('creats a SHA-256 `hash` based on proper inputs', () =>{
    expect(minedBlock.hash).
    toEqual(
        cryptoHash(
            minedBlock.timestamp, 
            minedBlock.nonce,
            minedBlock.difficulty,
            lastBlock.hash, 
            data
        )
    );
   });

    it('sets a `hash` that matches the difficulty criteria', () =>{
        expect(minedBlock.hash.substring(0, minedBlock.difficulty))
            .toEqual('0'.repeat(minedBlock.difficulty));
    });
  });
});