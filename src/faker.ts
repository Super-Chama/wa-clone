export const faker = {
  name: {
    firstName() {
      const firstNames = [
        'Tim',
        'John',
        'Jane',
        'Jack',
        'Jill',
        'Alan',
        'Mary',
        'Mavis',
        'Mildred',
        'Mortimer',
        'Morticia',
        'Fred',
        'Freda',
        'Tom',
        'Tina',
        'Terry',
        'Trevor',
        'Trevi',
        'Lili',
        'Lola',
        'Lily',
        'Fred',
        'Fox',
        'Ken',
        'Kenny',
        'Kendra',
        'Kendrick'
      ]
      return firstNames[Math.floor(Math.random() * firstNames.length)]
    },
    lastName() {
      const lastNames = [
        'Smith',
        'Johnson',
        'Williams',
        'Jones',
        'Brown',
        'Davis',
        'Miller',
        'Wilson',
        'Moore',
        'Taylor',
        'Anderson',
        'Thomas',
        'Jackson',
        'White',
        'Harris',
        'Martin',
        'Thompson',
        'Garcia',
        'Martinez',
        'Robinson',
        'Clark',
        'Rodriguez',
        'Lewis',
        'Lee',
        'Walker',
        'Hall',
        'Allen',
        'Young',
        'Hernandez',
        'King',
        'Wright',
        'Lopez',
        'Hill',
        'Scott',
        'Green',
        'Adams',
        'Baker',
        'Gonzalez',
        'Nelson',
        'Carter',
        'Mitchell',
        'Perez',
        'Roberts',
        'Turner',
        'Phillips',
        'Campbell',
        'Parker',
        'Evans',
        'Edwards',
        'Collins',
        'Stewart',
        'Sanchez',
        'Morris',
        'Rogers',
        'Reed',
        'Cook',
        'Morgan',
        'Bell',
        'Murphy',
        'Bailey',
        'Rivera',
        'Cooper',
        'Richardson',
        'Cox',
        'Howard',
        'Ward',
        'Torres',
        'Peterson',
        'Gray',
        'Ramirez',
        'James',
        'Watson',
        'Brooks',
        'Kelly',
        'Sanders',
        'Price',
        'Bennett',
        'Wood',
        'Barnes',
        'Ross',
        'Henderson',
        'Coleman',
        'Jenkins',
        'Perry',
        'Powell',
        'Long',
        'Patterson',
        'Hughes',
        'Flores',
        'Washington',
        'Butler',
        'Simmons',
        'Foster',
        'Gonzales',
        'Bryant',
        'Alexander',
        'Russell',
        'Griffin',
        'Diaz',
        'Hayes'
      ]

      return lastNames[Math.floor(Math.random() * lastNames.length)]
    }
  },
  internet: {
    email() {
      const addresses = [
        'test',
        'hello',
        'world',
        'example',
        'sample',
        'candidate',
        'recruiter',
        'hiring',
        'manager',
        'interviewer'
      ]
      const domains = [
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'aol.com',
        'hotmail.com',
        'protonmail.com',
        'zoho.com'
      ]
      return `${addresses[Math.floor(Math.random() * addresses.length)]}${Math.floor(
        1000 + Math.random() * 9000
      )}@${domains[Math.floor(Math.random() * domains.length)]}`
    },
    image() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
    }
  },
  date: {
    past() {
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 100))
      return date.valueOf()
    }
  },
  time: {
    past() {
      const maxDate = Date.now()
      const timestamp = Math.floor(Math.random() * maxDate)
      return new Date(timestamp).valueOf()
    }
  },
  uuid: {
    random: () => window.crypto.randomUUID()
  },
  message: {
    random: () => {
      const lorem =
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet ` +
        `nunc nec aliquet efficitur. Integer leo turpis, vehicula et enim eget, ` +
        `ullamcorper pretium ante. Vivamus nisl dolor, consequat eu ex nec, volutpat ` +
        `posuere nulla. In elementum metus sit amet nisi congue laoreet. In ullamcorper ` +
        `bibendum vulputate. Class aptent taciti sociosqu ad litora torquent per conubia ` +
        `nostra, per inceptos himenaeos. Suspendisse ac accumsan neque. Etiam eu nisi sem. ` +
        `Curabitur pulvinar quis lectus efficitur consequat. In accumsan finibus efficitur. ` +
        `Maecenas vitae felis interdum, sagittis ante at, tincidunt nibh. Vestibulum urna est,` +
        `aliquet in vulputate non, euismod quis lorem. Quisque at egestas tortor, ut blandit ` +
        `urna.Suspendisse potenti. Mauris sed libero dolor. Aenean dictum pretium rutrum. Nunc ` +
        `at mauris sit amet libero rutrum efficitur. Suspendisse id neque a justo euismod lacinia ` +
        `nec eget est. Aenean eu consectetur lacus. Duis tempor, erat quis tempor aliquam, urna ` +
        `est dapibus ex, at consequat ligula leo sed ligula.`

      return lorem.substring(0, Math.floor(Math.random() * 100)).trim() || lorem.substring(0, 100)
    }
  }
}
