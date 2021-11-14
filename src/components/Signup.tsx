import React from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div>
      <Card>
        <Card.Body>
            <h2 className="center-text überschrift">Registrieren</h2>
            <Form>
                <Form.Group id="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Passwort wiederholen</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
                <Button></Button>
            </Form>
        </Card.Body>
      </Card>
      <div className="center-text">Bereits registriert?</div>
    </div>
  );
}
