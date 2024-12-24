import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null;

    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        e.preventDefault();
        router.push(`/meal?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); // stop the event from triggering other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    };

    return (
        <>
        <Row className="mt-5">
            <Col md={12} className="text-center">
                <h2>Search History</h2>
            </Col>
        </Row>
        <br/><br/>
        {parsedHistory.length === 0 ? (
            <Card>
                <h4>Nothing Here</h4>
                <p>Try searching for some recipes.</p>
            </Card>
            ) : (
                <ListGroup>
                {parsedHistory.map((historyItem, index) => (
                    <ListGroup.Item className={styles.historyListItem} key={index} onClick={(e) => historyClicked(e, index)}>
                        {Object.keys(historyItem).map(key => (
                            <>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>
                        ))}
                        <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            )}
        </>
    )
}