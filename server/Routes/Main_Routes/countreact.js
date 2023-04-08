const connect = require("../../database/connect");
const path = require('path');

const topic = async (req, res) => {
    if (!req.query.id) {
        return res.json({err: "don't have any id"});
    }

    const query = `select i.id, r.react, r.userid from public.topic as t, public.react as r, public.idea as i where t.id='${req.query.id}' and i.topicid= t.id and r.ideaid= i.id order by i.id desc;`;
    const react = await connect(query);
    console.log(react)

    const arr = react.rows.reduce((acc, item) => {
        let existingItem = acc.find(e => e.id === item.id);

        if (!existingItem) {
            existingItem = {id: item.id, totallike: 0, totaldislike: 0, islike: false, isdislike: false};
            acc.push(existingItem);
        }

        if (item.react === 1) {
            existingItem.totallike++;
        } else if (item.react === -1) {
            existingItem.totaldislike++;
        }

        if (item.userid === req.session.user.id && item.react === 1) {
            existingItem.islike = true;
        }

        if (item.userid === req.session.user.id && item.react === -1) {
            existingItem.isdislike = true;
        }

        return acc;
    }, []);

    return res.json({react: arr});
};

module.exports = topic;


