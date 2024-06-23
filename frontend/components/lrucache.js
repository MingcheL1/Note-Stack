class LRUCache {
	constructor(capacity) {
    	this.capacity = capacity;
    	this.cacheMap = new Map();
    	this.head = null;
    	this.tail = null;
	}

	get(key) {
    	if (this.cacheMap.has(key)) {
        	const node = this.cacheMap.get(key);
        	this.moveToHead(node);
        	return node.value;
    	}
    	return -1;
	}

	put(key, value) {
    	if (this.cacheMap.has(key)) {
        	const node = this.cacheMap.get(key);
        	node.value = value;
        	this.moveToHead(node);
    	} else {
        	const newNode = new Node(key, value);
        	this.cacheMap.set(key, newNode);
        	if (!this.head) {
            	this.head = newNode;
            	this.tail = newNode;
        	} else {
            	newNode.next = this.head;
            	this.head.prev = newNode;
            	this.head = newNode;
        	}
        	if (this.cacheMap.size > this.capacity) {
            	this.removeTail();
        	}
    	}
	}

	moveToHead(node) {
    	if (node === this.head) {
        	return;
    	} else if (node === this.tail) {
        	this.removeTail();
    	} else {
        	node.prev.next = node.next;
        	node.next.prev = node.prev;
    	}

    	node.next = this.head;
    	this.head.prev = node;
    	this.head = node;
    	node.prev = null;
	}

	removeTail() {
    	if (!this.tail) return;

    	this.cacheMap.delete(this.tail.key);

    	if (this.head === this.tail) {
        	this.head = null;
        	this.tail = null;
    	} else {
        	this.tail = this.tail.prev;
        	this.tail.next = null;
    	}
	}
}

class Node {
	constructor(key, value) {
    	this.key = key;
    	this.value = value;
    	this.prev = null;
    	this.next = null;
	}
}














import axios from 'axios';

const sheetBestUrl = 'https://sheet.best/api/sheets/a57fa426-17d2-4fbc-87a8-9724d5219b68';

const fetchData = async () => {
    try {
        console.log('Fetching data from:', sheetBestUrl);
        const response = await axios.get(sheetBestUrl);
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const loadData = async () => {
    const data = await fetchData();
    if (data) {
        console.log('Data stored in variable:', data);
    } else {
        console.log('Failed to fetch data');
    }
};

loadData();






